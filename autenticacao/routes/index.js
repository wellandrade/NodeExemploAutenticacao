var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/:pagina?', global.authenticationMiddleware(), function(req, res, next) {
  const pagina = parseInt(req.params.pagina || '1');

  db.countAll((erro, qtdRegistros) => {
    if (erro) return console.log('Falha ao listar quantidade de registros ' + erro);

    const qtdPaginas = Math.ceil(qtdRegistros / db.TAMANHO_PAGINA);
    
    db.findAllUsers(pagina, (erro, docs) => {
      if (erro) return console.log('Falha ao listar os usuarios ' + erro);
  
      res.render('index', { title: req.user.username, docs, qtdRegistros, qtdPaginas, pagina, profile: req.user.profile });
    });
  })
});

module.exports = router;
