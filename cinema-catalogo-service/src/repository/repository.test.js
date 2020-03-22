const test = require('tape');
const repositorio = require('./repository');

function executarTestes() {

    var idCidade = null;
    var idCinema = null;
    var idFilme = null;

    test('Repositorio - Listar cidades', (t) => {
        repositorio.listarTodasCidades((erro, cidades) => {

            if (cidades.length > 0) {
                idCidade = cidades[1]._id;
                idCinema = cidades[1].cinemas[0]._id;
            }

            t.assert(!erro && cidades, 'Listou as cidades');
            t.end();
        });
    });

    test('Repositorio - Obter cinema por id cidade', (t) => {
        repositorio.obterCinemasPorIdCidade(idCidade, (erro, cinemas) => {

            t.assert(!erro && cinemas, 'Retornou cinemas por id cidade');
            t.end();
        });
    });
    
    test('Repositorio - Obter filme por id cinema', (t) => {
        repositorio.obterFilmesPorIdCinema(idCinema, (erro, filmes) =>{
            t.assert(!erro && filmes, 'Retornou filmes por id do cinema');
            t.end();
        });
    });

    test('Repositorio - Obter filme por id cidade', (t) => {
        repositorio.obterFilmesPorIdCidade(idCidade, (erro, filmes) => {

            if (filmes && filmes.length > 0)
                idFilme = filmes[0].idFilme;

            t.assert(!erro && filmes && filmes.length > 0, 'Retornou filmes por id da cidade');
            t.end();
        });
    });

    test('Repositorio - Obter sessoes de filme por id cidade', (t) => {
        repositorio.obterSessaoDoFilmePorIdCidade(idFilme, idCidade, (erro, sessoes) => {
            t.assert(!erro && sessoes, 'Retornou as sessoes por id cidade');
            t.end();
        });
    });

    test('Repositorio - Desconectar', (t) => {
        t.assert(repositorio.desconectar(), 'Desconectou do banco');
        t.end();
    });
};

module.exports = { executarTestes };