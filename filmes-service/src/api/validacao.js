const joi = require('@hapi/joi');

const validacaoFilme = joi.object({
    titulo: joi.string()
               .min(3)
               .max(30)
               .required(),

    sinopse: joi.string()
                 .min(10)
                 .max(150)
                 .required(),

    duracao: joi.number()
                .integer()
                .min(10)
                .max(240),

    dataLancamento: joi.date()
                       .required(),

    imagem: joi.string(),
                        
    categorias: joi.array()
                    .items(joi.string())
                    .min(1)
                    .max(2)
                    .required(),
});

module.exports = { validacaoFilme };
