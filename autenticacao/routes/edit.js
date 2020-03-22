var express = require('express');
var router = express.Router();

router.get('/:id', (req, res, next) => {
    const db = require('../db');

    db.findUserById (req.params.id, function (erro, dados) {
        if (erro)
            res.render('edit', { title: 'Editar', message: null, cliente: [] });
        else 
        {
            res.render('edit', { title: 'Editar', message: null, cliente: dados });
        }
    });
});

module.exports = router;
