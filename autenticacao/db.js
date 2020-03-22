const bcrypt = require('bcryptjs');
const objectId = require('mongodb').ObjectId;

function createUser(username, password, email, profile, callback) {
    const cryptPassword = bcrypt.hashSync(password, 10);
    global.db.collection('users').insert( { username, password: cryptPassword, email, profile}, callback);
};

function resetPassword(email, callback) {
    const utils = require('./util');
    const newPassword = utils.generatePassword();
    const cryptPassword = bcrypt.hashSync(newPassword, 10); //$set e para saber qual registro do documento vai ser alterado
    global.db.collection('users').updateOne( { email: email }, { $set:{password: cryptPassword }}, (erro, res) => {
        callback(erro, res, newPassword);
    });
};

function countAll(callback) {
    global.db.collection('users').count(callback);
};

const TAMANHO_PAGINA = 3;
function findAllUsers(pagina, callback) {
    const totalSkip = (pagina -1) * TAMANHO_PAGINA;
    global.db.collection('users').find().skip(totalSkip).limit(TAMANHO_PAGINA).toArray(callback);
}

function findUserById(id, callback) {
    global.db.collection('users').findOne( { _id: objectId(id) }, callback);
}

module.exports = { createUser, resetPassword, findAllUsers, TAMANHO_PAGINA, countAll, findUserById };
