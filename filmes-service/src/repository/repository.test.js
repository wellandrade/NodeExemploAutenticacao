const test = require('tape');
const repositorio = require('./repository');

function executarTestes() {
    var idFilme = null;

    test('Repositorio - salvar filme', (t) => {
        repositorio.salvarFilme( { 
            titulo: 'Vingadores', 
            sinopse: 'Herois mais poderosos da Terra', 
            duracao: 120,
            dataLancamento: new Date(),
            imagem: 'https://www.google.com.br',
            categoria: ['Aventura'] 
        }, (erro, result) => {
            t.assert(!erro && result, 'Filme cadastrado com sucesso');
            t.end();
        });
    });

    test('Repositorio - listar filmes', (t) => {
        repositorio.listarFilmes((erro, filmes) => {
            if (filmes && filmes.length > 0) {
                idFilme = filmes[0]._id;
            }
            t.assert(!erro && filmes, 'Listou todos os filmes');
            t.end();
        })
    });

    test('Repositorio - obter filme por id', (t) => {
        repositorio.obterFilmePorId(idFilme, (erro, filme) => {
            t.assert(!erro && filme, 'Filme localizado com sucesso');
            t.end();
        })
    });

    test('Repositorio - obter lancamentos', (t) =>{
        repositorio.obterLancamentos((erro, lancamento) =>{
            t.assert(!erro && lancamento, 'Lancamento localizado');
            t.end();
        })
    });

    test('Repositorio - finalizar conexao', (t) =>{
        t.assert(repositorio.desconectar(), 'Conexao fechada');
        t.end();
    });
};

module.exports = { executarTestes }
