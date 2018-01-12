var composeCode     = require("./compose-code")
,   composeMessage  = require("./compose-message")
,   sanitize        = require("./sanitize")
,   siftRequest     = require("./sift-request")
,   log             = require("./log")
;


/**
 * @description
 * Genera una funcion que, dado un nivel de registro `level`, y valiendose de 
 * metodos auxiliares de la clase, realiza el logueo de la informacion en el 
 * destino oportuno. 
 *
 *
 * @param {String} level
 */
exports = module.exports = function(level){
    return function composeAndLog(library, isil, ...args){
        const STREAMER = this;
        const RIFS = STREAMER._requestInstanceFieldsSubset;
        const RBFS = STREAMER._requestBodyFieldsSubset;
        
        sanitize(args);
        const ISBN = args[0];
        const INFO = args[1];

        const CODE = STREAMER._composeCode(level, isil, ISBN);
        const MESSAGE = composeMessage(level, library, ISBN, INFO);
        const SLUG = "[" + CODE + "] [" + MESSAGE + "]";
        
        INFO.severity   = level;
        INFO.isbn       = ISBN;
        INFO.isil       = isil;
        INFO.code       = CODE;
        INFO.message    = MESSAGE;
        INFO.slug       = SLUG;
        if (INFO.req) INFO.req = siftRequest(INFO.req, RIFS, RBFS);
        
        log(STREAMER["_"+level+"Drain"], INFO);
    };
};