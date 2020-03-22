const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
    // configuracao do passport 

    function findUser(username, callback) {
        global.db.collection('users').findOne( {'username': username}, (erro, documento) => {
            callback(erro, documento);
        });
    };

    function findUserById(idUser, callback) {
        const objectID = require('mongodb').ObjectID; 

        global.db.collection('user').find( { '_id': objectID(idUser) }, (erro, user) => {
            callback(erro, user);
        });
    };

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        findUserById(id, function(erro, user) {
            done(erro, user);
        });
    });
    
    passport.use(new LocalStrategy ( {
            usernameField: 'username', 
            passwordField: 'password'
        },
        (username, password, done) => {
            findUser(username, (erro, user) => {
                if (erro) return done(erro);

                
                if (!user) return done(null, false);

                // comparando as senhas
                bcrypt.compare(password, user.password, (erroValidacaoSenha, isValid) => {
                    if (erroValidacaoSenha) return done(erroValidacaoSenha);

                    if(!isValid) return done(null, false);

                    return done(null, user);
                })
            })
        }
    ));
}