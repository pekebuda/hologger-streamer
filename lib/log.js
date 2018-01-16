/**
 * @description
 * 
 * 
 * @param {Function} outlet               Canal a traves del cual se producira el 
 * volcado de datos. Debe tratarse por ello de un metodo o {Function} encargado 
 * de la escritura de datos; es decir, que dada una informacion, produzca a su 
 * invocacion el registro en algun soporte. Vgr, el metodo `log` de la API 
 * `console` (`console.log`). Required.
 * @param {Mixed} info 						
 */
exports = module.exports = function(outlet, info){
	if (this._logLevels.indexOf(info.severity) < this._minLogLevel) return;
    else console.warn("[HOLOGGER] Log failed. Streamer "+this.name+" does not implement _log method.");
};