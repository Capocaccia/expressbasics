var loggly = require('loggly');

function logger(tag){
  return loggly.createClient({
    token: process.env.LOGGLY_TOKEN,
    subdomain: 'capocaccia',
    tags: ['NodeJS', tag],
    json: true
  });
}

module.exports = logger;
