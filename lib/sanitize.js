var isBoolean       = require('lodash.isboolean');
var isString        = require('lodash.isstring');
var isNumber        = require('lodash.isnumber');
var isError         = require('lodash.iserror');
var isPlainObject   = require('lodash.isplainobject');
var clone           = require('lodash.clone');


/**
 * @description:
 * Modifica, en su caso, los parametros de entrada de manera que a su conclusion
 * `info` se halle siempre convertido (estandarizado) en un {Object} que recoge 
 * en forma de propiedades la info original presentada a saneamiento. 
 * Ademas de esta estandarizacion del tipo de primitiva, se produce una estandarizacion
 * secundaria en el nombre de un numero contado de propiedades, siendo estas:
 * + error => err
 * + request => req 
 *
 * Para info de tipo atomico (Boolean, String, Number) se almacena la informacion 
 * original en la propiedad `str`. Si la info es un {Error}, se almacena en la 
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
exports = module.exports = function(args){
    //// ARGUMENTS
    //logger()
    if (args.length === 0) {
        args[0] = null;
        args[1] = {};
    //logger({foo: "bar"}) || logger(3)
    } else if (args.length ==1) {
        //logger(3)
        if (isNumber(args[0])){
            args[0] = args[0];
            args[1] = {};
        //logger("some custom message")
        //logger({foo: "bar"})
        //logger(Error)
        } else {
            args[1] = clone(args[0]);
            args[0] = null;
        }
    //logger(3, {foo: "bar"})
    } else {}
    

    //// INFO
    if (isString(args[1])) args[1] = {str: args[1]};
    else if (isNumber(args[1])) args[1] = {str: args[1].toString()};
    else if (isBoolean(args[1])) args[1] = {str: args[1].toString()};
    else if (isError(args[1])) args[1] = {err: args[1]};
    else if (isPlainObject(args[1])) args[1] = args[1];
    else args[1] = {};


    //// RENOMBRAMIENTO
    if (args[1].error) {
        args[1].err = clone(args[1].error);
        delete args[1].error;
    }
    if (args[1].request) {
        args[1].req = clone(args[1].request);
        delete args[1].request;
    }
};