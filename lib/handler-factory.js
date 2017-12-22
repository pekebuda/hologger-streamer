var composeCode     = require("./compose-code")
,   composeMessage   = require("./compose-message")
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
    return function composeAndLog(){
        const STREAMER = this;
        const RIFS = STREAMER._requestInstanceFieldsSubset;
        const RBFS = STREAMER._requestBodyFieldsSubset;
        const ISIL = STREAMER.isil;
        const LIBRARY = STREAMER.library;
        
        const ARGS = sanitize(Array.prototype.slice.call(arguments));
        const ISBN = ARGS[0];
        const INFO = ARGS[1];

        const CODE = composeCode(level, ISIL, ISBN);
        const MESSAGE = composeMessage(level, LIBRARY, ISBN, INFO);
        const SLUG = "[" + CODE + "] [" + MESSAGE + "]";
        
        INFO.severity   = level;
        INFO.isbn       = ISBN;
        INFO.isil       = ISIL;
        INFO.code       = CODE;
        INFO.message    = MESSAGE;
        INFO.slug       = SLUG;
        if (INFO.req) INFO.req = siftRequest(INFO.req, RIFS, RBFS);
        
        log(STREAMER["_"+level+"Drain"], INFO);
    };
};