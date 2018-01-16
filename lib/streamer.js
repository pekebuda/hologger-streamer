var handlerFactory  = require("./handler-factory");


/**
 * @api public
 * @description 
 * {Streamer} constructor.
 *
 */
function Streamer(){
    this.name = "BaseStreamer";
    this.description = "Base Streamer constructor";

    const rifs = process.env.HOLOGGER_RIFS;
    const rbfs = process.env.HOLOGGER_RBFS;
    this._requestInstanceFieldsSubset = (rifs)? rifs.split(",") : [];
    this._requestBodyFieldsSubset = (rbfs)? rbfs.split(",") : [];
    this._logLevels = ["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"];
    this._minLogLevel = process.env.HOLOGGER_LOG_LEVEL || 0;
}




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.debug = handlerFactory("debug");
Streamer.prototype._debugDrain;         //a implementar por clases que hereden de {Streamer}




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.info = handlerFactory("info");
Streamer.prototype._infoDrain;          //a implementar por clases que hereden de {Streamer}




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.notice = handlerFactory("notice");
Streamer.prototype._noticeDrain;        //a implementar por clases que hereden de {Streamer}




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.warning = handlerFactory("warning");
Streamer.prototype._warningDrain;       //a implementar por clases que hereden de {Streamer}




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.error = handlerFactory("error");
Streamer.prototype._errorDrain;         //a implementar por clases que hereden de {Streamer}




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.critical = handlerFactory("critical");
Streamer.prototype._criticalDrain;      //a implementar por clases que hereden de {Streamer}




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.alert = handlerFactory("alert");
Streamer.prototype._alertDrain;         //a implementar por clases que hereden de {Streamer}




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.emergency = handlerFactory("emergency");
Streamer.prototype._emergencyDrain;     //a implementar por clases que hereden de {Streamer}




/**
 * @api private
 * @description 
 * 
 */
Streamer.prototype._composeCode = require("./compose-code");




/**
 * @api private
 * @description 
 * 
 */
Streamer.prototype._composeMessage = require("./compose-message");




/**
 * @api private
 * @description 
 * 
 */
Streamer.prototype._log = require("./log");




////// MODULE EXPORTS
module.exports = Streamer;