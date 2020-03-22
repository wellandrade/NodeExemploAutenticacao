const validacao = require('./validacao');

module.exports = (app, repositorio) => {

    app.get('/filmes', (req, res, next) => {
        repositorio.listarFilmes((erro, filmes) => {
            if (erro) return next(erro);

            res.json(filmes)
        });
    });

    app.get('/filmes/lancamentos', (req, res, next) => {
        repositorio.obterLancamentos((erro, lancamentos) =>{
            if (erro) return next(erro);
            
            res.json(lancamentos);
        });
    })

    app.get('/filmes/:id', (req, res, next) => {
        var id = req.params.id;

        repositorio.obterFilmePorId(id, (erro, filme) => {
            if(erro) return next(erro);
            
            res.json(filme);
        });
    });

    app.post('/filmes', (req, res, next) => {

        const dados = validacao.validacaoFilme.validate(req.body.value); // Chamar o modulo de validacao 
        if (dados.error) return next(dados.error);
        repositorio.salvarFilme( { dados }, (erro, resultado) => {
            if (erro) return res.json(dados.error).status(400);

            res.json(resultado);
        });
    })
}; 
