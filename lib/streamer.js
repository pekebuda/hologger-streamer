var _               = require('lodash')
,   handlebars      = require('handlebars')
;


/**
 * `Streamer` constructor.
 *
 * @api public
 * 
 * @param {Object} library              libreria de codigos empleada
 * @param {Nomber} isil: identificador numerico de la libreria de codigos empleada
 */
function Streamer(library, isil){
    this.name = "BaseStreamer";
    this.description = "Base Streamer constructor";
    this.library = library;
    this.isil = isil;

    const rifs = process.env.HOLOGGER_RIFS;
    const rbfs = process.env.HOLOGGER_RBFS;
    this._requestInstanceFieldsSubset = (rifs)? rifs.split(",") : [];
    this._requestBodyFieldsSubset = (rbfs)? rbfs.split(",") : [];
    
    this._debugDrain;
    this._infoDrain;
    this._noticeDrain;
    this._warningDrain;
    this._errorDrain;
    this._criticalDrain;
    this._alertDrain;
    this._emergencyDrain;
}




/**
 * @description 
 * 
 */
Streamer.prototype.debug = Streamer.prototype._composeAndLogFactory("debug");




/**
 * @description 
 * 
 */
Streamer.prototype.info = Streamer.prototype._composeAndLogFactory("info");




/**
 * @description 
 * 
 */
Streamer.prototype.notice = Streamer.prototype._composeAndLogFactory("notice");




/**
 * @description 
 * 
 */
Streamer.prototype.warning = Streamer.prototype._composeAndLogFactory("warning");




/**
 * @description 
 * 
 */
Streamer.prototype.error = Streamer.prototype._composeAndLogFactory("error");




/**
 * @description 
 * 
 */
Streamer.prototype.critical = Streamer.prototype._composeAndLogFactory("critical");




/**
 * @description 
 * 
 */
Streamer.prototype.alert = Streamer.prototype._composeAndLogFactory("alert");




/**
 * @description 
 * 
 */
Streamer.prototype.emergency = Streamer.prototype._composeAndLogFactory("emergency");




/**
 * @description
 * Genera una funcion que, dado un nivel de registro `level`, y valiendose de 
 * metodos auxiliares de la clase, realiza el logueo de la informacion en el 
 * destino oportuno. 
 */
Streamer.prototype._composeAndLogFactory = function(level){
    const STREAMER = this;
    return function composeAndLog(){
        var args = Array.prototype.slice.call(arguments);
        STREAMER._sanitize(args);
        var isbn = args[0];
        var info = args[1];
        
        const CODE = STREAMER._composeCode(level, isbn);
        const MESSAGE = STREAMER._composeMessage(level, isbn, info);
        const SLUG = "[" + CODE + "] [" + MESSAGE + "]";
        
        info.severity   = level;
        info.isbn       = isbn;
        info.isil       = STREAMER._isil;
        info.code       = CODE;
        info.message    = MESSAGE;
        info.slug       = SLUG;
        if (info.req) info.req = STREAMER._siftRequest(info.req);
        
        STREAMER._log(STREAMER["_"+level+"Drain"], info);
    };
};




/**
 * @description:
 * Modifica, en su caso, los parametros de entrada de manera que a su conclusion
 * info se halle siempre convertido (estandarizado) en un Object que recoge en 
 * forma de propiedades la info original presentada a saneamiento. 
 * Ademas de esta estandarizacion del tipo de primitiva, se produce una estandarizacion
 * secundaria en el nombre de un numero contado de propiedades, siendo estas:
 * + error => err
 * + request => req 
 *
 * Para info de tipo atomico (Boolean, String, Number) se almacena la informacion 
 * original en la propiedad `str`. Si la info es un Error, se almacena en la 
 * propiedad `err`.  
 *
 * 
 * @param {Array} args              Lista de parametros (argumentos) que se desea 
 * estandarizar, de modo que tras la operativa contenga esta, como primer elemento,
 * el isbn del evento (su identificador numerico), y como segundo un {Object} con
 * informacion complementaria.
 *
 * 
 * @see http://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language
 */
Streamer.prototype._sanitize = function(args){
    /////// ARGUMENTS
    //logger()
    if (args.length === 0) {
        args[0] = null;
        args[1] = {};
    
    } else if (args.length ==1) {
        //logger(3)
        if (_.isNumber(args[0])){
            args[0] = args[0];
            args[1] = {};
        //logger("some custom message")
        //logger({foo: "bar"})
        //logger(Error)
        } else {
            args[1] = _.clone(args[0]);
            args[0] = null;
        }
    //logger(3, {foo: "bar"})
    } else {}
    
    /////// INFO
    if (_.isString(args[1])) args[1] = {str: args[1]};
    else if (_.isNumber(args[1])) args[1] = {str: args[1].toString()};
    else if (_.isBoolean(args[1])) args[1] = {str: args[1].toString()};
    else if (_.isError(args[1])) args[1] = {err: args[1]};
    else if (_.isPlainObject(args[1])) args[1] = args[1];
    else args[1] = {};

    /////// RENOMBRAMIENTO
    if (args[1].error) {
        args[1].err = _.clone(args[1].error);
        delete args[1].error;
    }
    if (args[1].request) {
        args[1].req = _.clone(args[1].request);
        delete args[1].request;
    }
};




/**
 * @description
 *
 * 
 * @param {String} severity             identificador textual del nivel de 
 * logueo deseado
 * @param {Number} isbn                 identificador numerico del evento que 
 * se desea registrar
 *
 * 
 * @return 
 */
Streamer.prototype._composeCode = function(severity, isbn){
    var SEVERITY_CODE;
    switch (severity) {
        case 'debug': SEVERITY_CODE = 1*10000000; break;
        case 'info': SEVERITY_CODE = 2*10000000; break;
        case 'notice': SEVERITY_CODE = 3*10000000; break;
        case 'warning': SEVERITY_CODE = 4*10000000; break;
        case 'error': SEVERITY_CODE = 5*10000000; break;
        case 'critical': SEVERITY_CODE = 6*10000000; break;
        case 'alert': SEVERITY_CODE = 7*10000000; break;
        case 'emergency': SEVERITY_CODE = 8*10000000; break;
        default: break;
    }
    const LIBRARY_CODE  = (_.isNumber(this._isil))? this._isil*10000 : null;
    const EVENT_CODE    = (_.isNumber(isbn))? isbn : null;
    const FULL_CODE     = (!LIBRARY_CODE || !EVENT_CODE)? 
                                "UNCOMPOSABLE CODE"
                                : SEVERITY_CODE + LIBRARY_CODE + EVENT_CODE;
    return FULL_CODE;
};




/**
 * @description
 * 
 * 
 * @param {String} severity     Identificador textual del nivel de logueo deseado
 * @param {Number} isbn         Identificador numerico del evento que se desea 
 * registrar
 * @param {Mixed} info
 *
 * 
 * @return 
 */
Streamer.prototype._composeMessage = function(severity, isbn, info){
    var MESSAGE;
    try {
        MESSAGE = handlebars.compile(this.library[severity][isbn], {noEscape:true})(info);
    } catch (e) {
        //logger(Error)
        if (info.err) MESSAGE = info.err.toString();
        //logger("Some message")
        else if (info.str) MESSAGE = info.str;
        else MESSAGE = "=========UNMATCHED CODE: " + severity + "/" + isbn + "==========";
    }
    return MESSAGE;
};




/**
 * @description
 * Selecciona y devuelve un subconjunto de propiedades de la solicitud pasada como 
 * argumento, excluyendo de mismo, en caso de que una de tales fuera 'body', las
 * propiedades de este igualmente explicitadas.
 * 
 * No modifica el parametro pasado por argumento (que debiera ser un objecto 
 * request de ExpressJS)
 *
 * 
 * @param {Object} req: 
 */
Streamer.prototype._siftRequest = function(req){
    if (!req) return {};

    const REQUEST = {};
    const rifs = this._requestInstanceFieldsSubset;
    const rbfs = this._requestBodyFieldsSubset;
    
    /////// INCLUSIONES
    if (rifs.length > 0) rifs.forEach( (field)=>{REQUEST[field]=req[field]});
    
    /////// EXCLUSIONES 
    //@important puede petarme en peticiones grandes
    if ( req.body && rbfs.indexOf("body")!==0 ) {
        REQUEST.body = req.body;
        rbfs.forEach( (field)=>{_.unset(REQUEST, 'body.'+field)} );
    }
    
    return REQUEST;
};




/**
 * @description
 * Puesto que en entornos de desarrollo (development) solo se loguea un 
 * mensaje que resume el evento (al contrario que en pre-produccion y en 
 * produccion, donde se almacena como JSON toda la informacion del mismo),
 * en los casos en que el evento contenga un Object de tipo Error, ademas 
 * del slug se loguea explicitamente el stack del Error, pues de otro modo se 
 * pierde la informacion contenida en el mismo, vital para la depuracion 
 * del mismo.
 * 
 * 
 * @param {Function} outlet               Canal a traves del cual se producira el 
 * volcado de datos. Debe tratarse por ello de un metodo o {Function} encargado 
 * de la escritura de datos; es decir, que dada una informacion, produzca a su 
 * invocacion el registro en algun soporte. Vgr, el metodo `log` de la API 
 * `console` (`console.log`). Required.
 * @param {Mixed} info:
 */
Streamer.prototype._log = function(outlet, info){
    if (info && info.slug) outlet(info.slug);
    if (info && info.err) {
        outlet("====================ERR STACK BEGINS===================");
        outlet(info.err.stack);
        outlet("====================ERR STACK ENDS===================");
    }
};




////// MODULE EXPORTS
module.exports = Streamer;