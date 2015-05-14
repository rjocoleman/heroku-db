Heroku DB CLI Plugin
====================

This is a Heroku Toolbelt CLI plugin to interact with databases at `DATABASE_URL`. Not dependent on Heroku Postgres.

Features:

* Dump `DATABASE_URL` to local filesystem.
* Restore a database dump to an app or an arbitrary database URI.

You can install this plugin by:

```sh
$ heroku plugins:install heroku-db
```


## Usage:

```sh
$ heroku help db
```


#### db:dump

Dump the an app's `DATABASE_URL` to the current directory.


#### db:restore DATABASE_URL DUMP_FILE

Restores a database dump.

```sh
$ heroku db:restore postgresql://user:host@localhost:5432/dbname foo-application.dump
```


## Supported Databases

Currently only Postgresql is supported.

PRs are welcome for other databases.


## Known issues

* `--confirm` flag on dump doesn't work.
