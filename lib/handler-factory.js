var sanitize        = require("./sanitize");
var siftRequest     = require("./sift-request");




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
        const RIFS = this._requestInstanceFieldsSubset;
        const RBFS = this._requestBodyFieldsSubset;
        
        sanitize(args);
        const ISBN = args[0];
        const INFO = args[1];

        const CODE = this._composeCode(level, isil, ISBN);
        const MESSAGE = this._composeMessage(level, library, ISBN, INFO);
        const SLUG = "[" + CODE + "] [" + MESSAGE + "]";
        
        INFO.severity   = level;
        INFO.isbn       = ISBN;
        INFO.isil       = isil;
        INFO.code       = CODE;
        INFO.message    = MESSAGE;
        INFO.slug       = SLUG;
        if (INFO.req) INFO.req = siftRequest(INFO.req, RIFS, RBFS);
        
        var outlet = this["_"+level+"Drain"];
        this._log(outlet, INFO);
    };
};