var composeCode     = require("./compose-code")
,   compseMessage   = require("./compose-message")
,   sanitize        = require("./sanitize")
,   siftRequest     = require("./sift-request")
,   log             = require("./log")
;


/**
 * @description
 * Genera una funcion que, dado un nivel de registro `level`, y valiendose de 
 * metodos auxiliares de la clase, realiza el logueo de la informacion en el 
 * destino oportuno. 
 */
exports = module.exports = function(level){
    const STREAMER = this;

    return function composeAndLog(){
        var args = Array.prototype.slice.call(arguments);
        STREAMER.sanitize(args);
        var isbn = args[0];
        var info = args[1];
        
        const CODE = STREAMER.composeCode(level, isbn);
        const MESSAGE = STREAMER.composeMessage(level, isbn, info);
        const SLUG = "[" + CODE + "] [" + MESSAGE + "]";
        
        info.severity   = level;
        info.isbn       = isbn;
        info.isil       = STREAMER._isil;
        info.code       = CODE;
        info.message    = MESSAGE;
        info.slug       = SLUG;
        if (info.req) info.req = STREAMER.siftRequest(info.req);
        
        STREAMER.log(STREAMER["_"+level+"Drain"], info);
    };
};