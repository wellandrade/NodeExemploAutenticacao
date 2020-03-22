require('dotenv-safe').config();
require('./config/mongodb.test').executarTestes();
require('./repository/repository.test').executarTestes();
