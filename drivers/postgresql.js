'use strict';
let dumpBinary = 'pg_dump';

module.exports = {
  binary: dumpBinary,
  command: function (databaseUrl, exportName) {
    return `PGPASSWORD=${databaseUrl.password} ${dumpBinary} -Fc --no-acl --no-owner -h ${databaseUrl.host} -p ${databaseUrl.port} -U ${databaseUrl.user} ${databaseUrl.database} > ${exportName}`
  }
};
