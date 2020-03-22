const test = require('tape');
const superTest = require('supertest'); // simula requisicao igual ao postman
const filmes = require('./filme');
const server = require('../server/server');
const repositorio = require('../repository/repository');

function executarTestes() {

    var app = null;
    server.start(filmes, repositorio, (erro, app) => {

        var id = null;

        test('Filmes - Listar todos', (t) => {
            superTest(app)
                .get('/filmes') 
                .expect('Content-Type', /json/) // o que espera de retorno 
                .expect(200)
                .end((erro, res) => {
                    if (res.body && res.body.length > 0)
                        id = res.body[0]._id;

                    t.assert(res.body && res.body.length > 0, "Listou todos os filmes");
                    t.end();
                });
        });

        test('Filmes - Obter lancamentos', (t) =>{
            superTest(app)
                .get('/filmes/lancamentos')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((erro, res) => {
                    t.assert(res.body, 'Retornou os lancamentos');
                    t.end();
                });
        });
    
        
        test('Filmes - Obter filme por id', (t) => {
            superTest(app)
                .get('/filmes/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((erro, res) => {
                    t.assert(res.body, 'Retornou filme por id');
                    t.end();
                });
        });

        test('Filmes - Salvar filme', (t) => {
            superTest(app)
                .get('/filmes/')
                .send( { 
                        titulo: '', 
                        sinopse: 'Herois mais poderosos da Terra', 
                        duracao: 120,
                        dataLancamento: new Date(),
                        imagem: 'https://www.google.com.br',
                        categoria: ['Aventura'] 
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((erro, sucesso) => {
                    t.assert(!erro && sucesso);
                    t.end();
                });
        });
        
        server.stop();
    });
};

module.exports = { executarTestes };
