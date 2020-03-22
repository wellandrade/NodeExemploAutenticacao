var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signup', function(req, res, next) {
    if (req.query.fail)
      res.render('signup', { title: 'Cadastro', message: 'Falha no cadastro do usuario'} );
    else 
      res.render('signup', { title: 'Cadastro', message: null } );
});

/* POST users */
router.post('/signup', function(req, res, next) {
  const db = require('../db');
  db.createUser(req.body.username, req.body.password, req.body.email, req.body.profile, (erro, sucesso) => {
    if (erro) 
    {
      return res.redirect('/users/signup?fail=true');
    }
    else {
      // var text = 'Obrigado por se cadastrar {fulano}, sua senha é {senha}';
      // text = text.replace('{fulano}', req.body.username).replace('{senha}', req.body.password);
      // require('../mail')(req.body.emai, 'Cadastro realizado com sucesso', text);
      res.redirect('/');
    }
  });
});


/* POST forgot */
router.post('/forgot', function(req, res, next) {
  const db = require('../db');
  db.resetPassword(req.body.password, (erro, sucesso, newPassword) => {
    if (erro) 
    {
      return res.redirect('/login?reset=true');
    }
    else {
      // var text = `Ola, sua nova senha ${newPassword}, sua senha antiga nao funciona mais`;
      // require('../mail')(req.body.emai, 'Sua senha foi alterada', text);
      res.redirect('/');
    }
  });
});

/* GET forgot */
router.get('/forgot', function(req, res, next) {
  res.render( 'forgot', { title: '' });
});

module.exports = router;
