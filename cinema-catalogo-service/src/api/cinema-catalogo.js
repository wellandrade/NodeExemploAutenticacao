module.exports = (app, repositorio) => {

    app.get('/cidades', (req, res, next) => {
        repositorio.listarTodasCidades((erro, cidades) => {
            if (erro) return next(erro);
            res.json(cidades);
        });
    });

    app.get('/cinemas/:id/filmes', (req, res, next) => {
        repositorio.obterFilmesPorIdCinema(req.params.id, (erro, filmes) => {
            if (erro) return next(erro);
            res.json(filmes);
        });
    });

    app.get('/cidades/:id/cinemas', (req, res, next) => {
        repositorio.obterCinemasPorIdCidade(req.para.id, (erro, cinemas) => {
            if (erro) return next(erro);
            res.json(cinemas);
        });
    });

    app.get('/cidades/:id/filmes/:idFilme', (t) => {
        repositorio.obterSessaoDoFilmePorIdCidade(req.params.id, req.params.idFilme, (erro, sessoes) => {
            if (erro) return next(erro);
            res.json(sessoes);
        });
    });

    app.get('cinemas/:id/filmes/:idFilme', (t) =>{
        repositorio.obterSessaoDoFilmePorIdCinema(req.params.id, req.params.idCinema, (erro, sessoes) => {
            if (erro) return next(erro);
            res.json(sessoes);
        });
    });
};