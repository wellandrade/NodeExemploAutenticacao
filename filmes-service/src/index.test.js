console.log('start');

require('dotenv-safe').config();
require('./config/mongodb.test.js').executarTestes();
require('./repository/repository.test.js').executarTestes();
require('./server/server.test.js').executarTestes();
require('./api/filme.test').executarTestes();
