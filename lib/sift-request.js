var _ = require('lodash');


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
exports = module.exports = function(req){
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