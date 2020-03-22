const test = require('tape'); 
const supertest = require('supertest'); 
const movies = require('./cinema-catalogo'); 
const server = require("../server/server"); 
const repository = require("../repository/repository"); 

function executarTestes() { 
    
    var app = null;
    server.start(movies, repository, (err, app) => {

        var idCidade = null; 
        var idFilme = null; 
        var idCinema = null; 

        test('GET /cidades', (t) => { 
            supertest(app) .get('/cidades') 
                .expect('Content-Type', /json/) 
                .expect(200) 
                .end((err, res) =>{ 
                if(res.body && res.body.length > 0) {
                    idCidade = res.body[1]._id; 
                }
                t.error(err, 'Ocorreu erro'); 
                t.assert(res.body && res.body.length > 0, "Retornou todas as cidades");
                t.end() 
                }); 
            });

        test('GET /cidades/:id/filmes', (t) => { 
            supertest(app) 
                .get('/cidade/' + idCidade + "/filmes") 
                .expect('Content-Type', /json/) 
                .expect(200) 
                .end((err, res) =>{ 
                    if(res.body && res.body.length > 0) {
                        idFilme = res.body[0].idFilme;
                    }
                t.error(err, 'Ocorreu erro') 
                t.assert(res.body, "Retornou os filmes por id cidade"); 
                t.end() 
                }); 
            }); 
                
        test('GET /cidades/:id/filmes/:idFilme', (t) => { 
            supertest(app) 
                .get('/cidade/' + idCidade + '/filmes/' + idFilme) 
                .expect('Content-Type', /json/) 
                .expect(200) 
                .end((err, res) =>{ 
                    if(res.body && res.body.length > 0) {
                        idCinema = res.body[0].idCinema; 
                    }
                t.error(err, 'Ocorreu erros') 
                t.assert(res.body && res.body.length > 0, "Retornou filmes da sessao por id cidade"); 
                t.end() 
                }) 
            }); 
               
        test('GET /cidade/:id/cinemas', (t) => { 
            supertest(app) 
                .get('/cidade/' + idCidade + '/cinema') 
                .expect('Content-Type', /json/) 
                .expect(200) 
                .end((err, res) => { 
                t.error(err, 'Sem erros') 
                t.assert(res.body, "Retornou cinema por id cidade"); 
                t.end();
                });
            }); 
            
        test('GET /cinema/:cinema/filme', (t) => { 
            supertest(app) 
                .get('/cinema/' + idCinema + "/filme") 
                .expect('Content-Type', /json/) 
                .expect(200) 
                .end((err, res) =>{ 
                t.error(err, 'No errors') 
                t.assert(res.body, "Retornou filmes por id cinema"); 
                t.end(); 
                }); 
            });
            
        test('GET /cinema/:cinema/filme/:movie', (t) => { 
            supertest(app) 
                .get('/cinema/' + idCinema + "/filme/" + idFilme) 
                .expect('Content-Type', /json/) 
                .expect(200) 
                .end((err, res) =>{ 
                t.error(err, 'No errors') 
                t.assert(res.body, "Retornou filmes da sessao por id cinema");
                t.end(); 
                }); 
            });
    });

    repository.desconectar();
    server.stop();

 } 

module.exports = { executarTestes }
