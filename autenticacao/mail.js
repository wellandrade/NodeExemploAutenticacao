module.exports = function(to, subject, text) {
    const nodemailer = require('nodemailer');

    const smtpTransport = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMPT_USERNAME,
            password: process.env.SMPT_PASSWORD
        }
    });

    const message = {
        from: process.env.SMTP_SERVER,
        to,
        subject,
        text
    };

    smtpTransport.sendMail(message, (erro, sucesso) =>{
        if (erro)
            console.log('Falha ao enviar o email ' + erro);
        else 
            console.log('Email enviado com sucesso');

        smtpTransport.close();
    });
};