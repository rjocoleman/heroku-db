'use strict';
let dumpBinary = 'pg_dump';
let restoreBinary = 'pg_restore';

module.exports = {
  dumpBinary: dumpBinary,
  dumpCommand: function (databaseUrl, exportName) {
    return `PGPASSWORD=${databaseUrl.password} ${dumpBinary} --verbose -Fc --no-acl --no-owner -h ${databaseUrl.host} -p ${databaseUrl.port} -U ${databaseUrl.user} ${databaseUrl.database} > ${exportName}`
  },
  restoreBinary: restoreBinary,
  restoreCommand: function (databaseUrl, dumpFile) {
    return `PGPASSWORD=${databaseUrl.password} ${restoreBinary} --verbose --clean --no-acl --no-owner -h ${databaseUrl.host} -p ${databaseUrl.port} -U ${databaseUrl.user} -d ${databaseUrl.database} ${dumpFile}`
  }
};
