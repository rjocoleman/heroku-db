Heroku DB CLI Plugin
====================

This is a Heroku Toolbelt CLI plugin to interact with databases at `DATABASE_URL`. Not dependent on Heroku Postgres.

Features:

* Dump `DATABASE_URL` to local filesystem.

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


## Supported Databases

Currently only Postgresql is supported.

PRs are welcome for other databases.


## Known issues

* `--confirm` flag on dump doesn't work.
