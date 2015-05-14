'use strict';
let shell      = require('shelljs');
let parseDbUrl = require('parse-database-url');
let h          = require('heroku-cli-util');

module.exports = {
  topic: 'db',
  command: 'dump',
  description: 'Dumps the database from DATABASE_URL to your current directory',
  help: `Dumps the database from DATABASE_URL to your current directory
Example:

  $ heroku db:dump -a foo-application
  Dumped: foo-application.dump`,
  needsApp: true,
  needsAuth: true,

  run: h.command(function* (context, heroku) {
    // Get the config vars for the app
    let config = yield heroku.apps(context.app).configVars().info();
    if (!config.DATABASE_URL) {
      h.error('App does not have DATABASE_URL');
      process.exit(1);
    }

    // parse the databaseUrl
    let databaseUrl = parseDbUrl(config.DATABASE_URL);
    let exportName = `${databaseUrl.database}.dump`;

    switch (databaseUrl.driver) {
      case 'postgresql':
        var driver = require('../../drivers/postgresql');
        break;
      default:
        h.error(`Sorry: '${databaseUrl.driver}' databases aren't supported yet.`);
        process.exit(1);
    }

    if (!shell.which(driver.dumpBinary)) {
      h.error(`This database type requires: ${driver.dumpBinary} to be installed`);
      process.exit(1);
    }

    if (shell.test('-f', exportName)) {
      yield h.confirmApp(exportName, context.flags.confirm, `Output file ${exportName} already exists.`);
    }

    console.log(`Dumping ${exportName} from ${databaseUrl.host} with ${driver.dumpBinary}`);

    shell.exec(driver.dumpCommand(databaseUrl, exportName), function(code, output) {
      console.log(output);
      if (code !== 0) {
        console.log('Dump failed');
        process.exit(1);
      } else {
        console.log(`Dumped: ${exportName}`);
      }
    });

  })

};
