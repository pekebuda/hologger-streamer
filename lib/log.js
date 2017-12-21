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
exports = module.exports = function(outlet, info){
    if (info && info.slug) outlet(info.slug);
    if (info && info.err) {
        outlet("====================ERR STACK BEGINS===================");
        outlet(info.err.stack);
        outlet("====================ERR STACK ENDS===================");
    }
};