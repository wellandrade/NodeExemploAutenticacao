const mongoDb = require('../config/mongodb');

function listarFilmes(callback) {

    mongoDb.conectar((erro, db) => {
        db.collection("filmes").find().toArray(callback);
    });
}

function obterFilmePorId(id, callback) {

    mongoDb.conectar((erro, db) => {

        var objId = require('mongodb').ObjectId;
        db.collection('filmes').findOne({ _id: objId(id) }, callback);
    });
}

function obterLancamentos(callback) {
    
    var mesAtual = new Date();
    mesAtual.setMonth(mesAtual.getMonth() - 1);
    mesAtual.setHours(0,0,0);
    mesAtual.setMilliseconds(0,0,0);

    mongoDb.conectar((erro, db) => {
        db.collection('filmes').find({ dataLancamento: { $gte: mesAtual }} ).toArray(callback);
    })
}

function salvarFilme (filme, callback) {
    mongoDb.conectar((erro, db) => {
        if (erro) return callback(erro, null);

        db.collection('filmes').insertOne(filme, (erro2, res) => {
            if (erro2) return next(erro);
            console.log(res);
            return callback(erro2, res);
        });
    });
}

function desconectar() {
    return mongoDb.desconectar();
}

module.exports = { listarFilmes, obterFilmePorId, obterLancamentos, salvarFilme, desconectar }