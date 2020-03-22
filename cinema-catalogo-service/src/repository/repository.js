const mongoDb = require('../config/mongodb');
const ObjectId = require('mongodb').ObjectId;

function listarTodasCidades (callback) {
    mongoDb.conectar((erro, db) => {
        if (erro) return callback(erro, null);

        // Primeiro parametro vazio
        // Segundo parametro somente os campos que serao listados
        db.collection('cinemaCatalogo').find().toArray(callback);
    });
};

function obterCinemasPorIdCidade(idCidade, callback) {
    var objIdCidade = ObjectId(idCidade);

    mongoDb.conectar((erro, db) =>{
        db.collection('cinemaCatalogo').find( { _id: objIdCidade }).toArray((falhaCidade, cidades) =>{
            if (falhaCidade) return callback(falhaCidade, null);
            callback(falhaCidade, cidades[0].cinemas[0]._id);
        });
    });
};

function obterFilmesPorIdCinema(idCinema, callback) {
    var cinemaId = ObjectId(idCinema);

    mongoDb.conectar((falhaConexao, db) => {
        db.collection('cinemaCatalogo').aggregate([ // para juntar
            {$match: {'cinemas._id': cinemaId }}, // matcha para trazer somente pelo id 
            {$unwind: '$cinemas'}, // quando for o group, o unwind que os valores do array todos no mesmo nivel. sem campo multi-valorado 
            {$unwind: '$cinemas.salas'},
            {$unwind: '$cinemas.salas.sessoes'},
            {$group: { _id: { filme: '$cinemas.salas.sessoes.filme', idFilme: '$cinemas.salas.sessoes.idFilme'} }},
        ]).toArray(callback);
    });
};

function obterFilmesPorIdCidade(idCidade, callback) {
    var objIdCidade = ObjectId(idCidade);

    mongoDb.conectar((erroConexao, db) =>{
        db.collection('cinemaCatalogo').aggregate([
            {$match: {'_id': objIdCidade }},
            {$unwind: '$cinemas'},
            {$unwind: '$cinemas.salas'},
            {$group: { _id: { filme: '$cinemas.salas.sessoes.filme', idFilme: '$cinemas.salas.sessoes.idFilme' } }}
        ]).toArray((erro, sessoes) => {
            if (erro) return callback(erro, null);
                callback(erro, sessoes.map(item => {
                     return { idFilme: item._id.idFilme, filme: item._id.idFilme }
                }
            ));
        });
    });
};

function obterSessaoDoFilmePorIdCidade(idFilme, idCidade, callback){ 
    mongoDb.conectar((err, db) => { 
        db.collection('cinemaCatalogo').aggregate([ 
        {$match: {'_id': idCidade}}, 
        {$unwind: '$cinemas'}, 
        {$unwind: '$cinemas.salas'}, 
        {$match: {'cinemas.salas.sessoes.idFilme': idFilme}}, 
        {$group: {_id: { filme: '$cinemas.salas.sessoes.filme', idFilme: '$cinemas.salas.sessoes.idFilme', 
                        idCinema: '$cinemas._id', sala: '$cinemas.salas.nome', sessao: '$cinemas.salas.sessoes'}}} 
        ]).toArray((err, sessoesFilme) => { 
            if(err) return callback(err, null); 
            callback(err, sessoesFilme.map(item => { 
                return {idFilme: item._id.idFilme, filme: item._id.filme, idCinema: item._id.idCinema, sala: item._id.sala, 
                    sessao: item._id.sessao }
            }));
        });
     }); 
};

// function obterSessaoDoFilmePorIdCinema(idFilme, idCinema, callback){ 
//     mongoDb.conectar((err, db) => {
//         db.collection("cinemaCatalog").aggregate([ 
//         {$match: {"cinemas._id": idCinema}}, 
//         {$unwind: "$cinemas"}, 
//         {$unwind: "$cinemas.salas"}, 
//         {$unwind: "$cinemas.salas.sessoes"}, 
//         {$match: {"cinemas.salas.sessoes.idFilme": idFilme}}, 
//         {$group: {_id: { filme: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme", sala: "$cinemas.salas.nome", 
//                         sessao: "$cinemas.salas.sessoes"}}} 
//         ]).toArray((err, sessoesPorCinema) => { 
//         if(err) return callback(err, null); 
//         callback(err, sessoesPorCinema.map(item => { 
//             return {idFilme: item._id.idFilme, filme: item._id.filme, sala: item._id.sala, sessao: item._id.sessao } } 
//             ));
//         });
//     }); 
// };
    
function desconectar() {
    return mongoDb.desconectar();
}

module.exports = { listarTodasCidades, obterCinemasPorIdCidade, obterFilmesPorIdCinema, obterFilmesPorIdCidade, 
                    obterSessaoDoFilmePorIdCidade, desconectar };
