var _ = require('lodash');


/**
 * @description
 * Selecciona y devuelve un subconjunto de propiedades de la solicitud pasada como 
 * argumento, excluyendo del mismo, en caso de que una de tales fuera `body`, las
 * propiedades de este igualmente explicitadas.
 * 
 * No modifica el parametro pasado por argumento (que debiera ser un objecto 
 * request de ExpressJS)
 *
 * 
 * @param {Object} req              Request
 * @param [String] rifs             Request Instance Fields Subset.
 * @param [String] rbfs             Request Body Fields Subset.
 */
exports = module.exports = function(req, rifs, rbfs){
    if (!req) return {};

    const REQUEST = {};
    
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