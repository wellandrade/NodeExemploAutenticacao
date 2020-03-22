require('dotenv-safe').config(); // carregar variaveis de ambiente

var http = require('http');
const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();
var cookieParser = require('cookie-parser');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const filmesServiceProxy = httpProxy('http://localhost:3000');
const cinemaCatalogoServiceProxy = httpProxy('http://localhost:3005');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));
app.use(cookieParser());

app.post('/login', (req, res, next) =>{
    if (req.body.usuario === 'well' && req.body.senha === '1234567') {
        const id = 1; // seria o id do usuario no banco

        // Primeiro parametro: os valores do banco que queria armazenar no jwt
        // Segundo parametro: o valor da variavel de ambiente que esta na chave SECRET
        // Terceiro parametro: o tempo de expiracao em segundos

        var token = jwt.sign({ id }, process.env.SECRET, { expiresIn: 300 });
        res.status(200).send( { auth: true, token: token });
    }

    res.status(500).send('Login invalido');
});

app.get('/logout', (req, res, next) =>{
    res.status(200).send( { auth: false, token: null} );
});

app.get('/', () =>{
    console.log('start');
});

function verificaJWT(req, res, next) {
    var token = req.headers['x-access-token']; // token tem q vim nesse cabecalho

    if(!token)
        return res.status(401).send( { auth: false, message: 'Falha na autenticacao '});

    jwt.verify(token, process.env.SECRET, function (erro, decode) {
        if (erro)
            return res.status(500).send( { auth: false, message: 'Falha na autenticacao' });

        // o REQ.USERID  só existe enquanto a requisicao existir, e o .id é o que foi fornecido parametro do jwt
        req.userId = decode.id;
        
        next();
    });

};

app.get('/filmes', verificaJWT, (req, res, next) => {

    // ex.: de como usar o REQ.USERID, só tem acesso se tiver o valor 1 
    if (req.userId == 1 ) {
        filmesServiceProxy(req, res, next);
    };
});

app.get('/cidades', verificaJWT, (req, res, next) => {
    cinemaCatalogoServiceProxy(req, res, next);
});

app.get('/cidades/:id/filmes', verificaJWT, (req, res, next) => {
    cinemaCatalogoServiceProxy(req, res, next);
});


var server = http.createServer(app);
server.listen(3003);
