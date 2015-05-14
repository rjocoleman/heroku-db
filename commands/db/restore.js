'use strict';
let shell      = require('shelljs');
let parseDbUrl = require('parse-database-url');
let h          = require('heroku-cli-util');

module.exports = {
  topic: 'db',
  command: 'restore',
  description: 'Restores a database',
  help: `Restores a database from arguments

  $ heroku db:restore postgres://user:pass@localhost:5423/database foo-application.dump
  Restored: foo-application.dump`,
  args: [{name: 'database_url'}, {name: 'dump_file'}],

  run: h.command(function* (context, heroku) {
    let databaseUrl = parseDbUrl(context.args.database_url);
    let dumpFile = context.args.dump_file;

    switch (databaseUrl.driver) {
      case 'postgresql':
        var driver = require('../../drivers/postgresql');
        break;
      default:
        h.error(`Sorry: '${databaseUrl.driver}' databases aren't supported yet.`);
        process.exit(1);
    }

    if (!shell.which(driver.restoreBinary)) {
      h.error(`This database type requires: ${driver.restoreBinary} to be installed`);
      process.exit(1);
    }

    yield h.confirmApp(databaseUrl.database, context.flags.confirm, `WARNING: Any existing data in the database ${databaseUrl.database} will be overwritten.`);

    console.log(`Restoring ${dumpFile} to ${databaseUrl.host}/${databaseUrl.database} with ${driver.restoreBinary}`);

    shell.exec(driver.restoreCommand(databaseUrl, dumpFile), function(code, output) {
      console.log(output);
      if (code !== 0) {
        console.log('Restore failed');
        process.exit(1);
      } else {
        console.log(`Restored: ${dumpFile}`);
      }
    });

  })

};
