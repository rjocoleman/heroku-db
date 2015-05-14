exports.topics = [{
  name: 'db',
  description: 'A Heroku Toolbelt plugin to interact with DATABASE_URLs. Not dependent on Heroku Postgres.'
}];

exports.commands = [
  require('./commands/db/dump'),
  require('./commands/db/restore')
];
