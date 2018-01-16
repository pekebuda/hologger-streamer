var isNumber  = require('lodash.isnumber');


/**
 * @description
 *
 * 
 * @param {String} severity             identificador textual del nivel de 
 * logueo deseado
 * @param {Number} isil                 identificador numerico de libreria de 
 * codigos
 * @param {Number} isbn                 identificador numerico del evento que 
 * se desea registrar
 *
 * 
 * @return 
 */
exports = module.exports = function(severity, isil, isbn){
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
    const LIBRARY_CODE  = (isNumber(isil))? isil*10000 : null;
    const EVENT_CODE    = (isNumber(isbn))? isbn : null;
    const FULL_CODE     = (!LIBRARY_CODE || !EVENT_CODE)? "UNCOMPOSABLE CODE"
                                : SEVERITY_CODE + LIBRARY_CODE + EVENT_CODE;
    return FULL_CODE;
};