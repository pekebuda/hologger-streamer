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

        var args = Array.prototype.slice.call(arguments);
        sanitize(args);
        var isbn = args[0];
        var info = args[1];
        
        const CODE = composeCode(level, ISIL, isbn);
        const MESSAGE = composeMessage(level, LIBRARY, isbn, info);
        const SLUG = "[" + CODE + "] [" + MESSAGE + "]";
        
        info.severity   = level;
        info.isbn       = isbn;
        info.isil       = ISIL;
        info.code       = CODE;
        info.message    = MESSAGE;
        info.slug       = SLUG;
        if (info.req) info.req = siftRequest(info.req, RIFS, RBFS);
        
        log(STREAMER["_"+level+"Drain"], info);
    };
};