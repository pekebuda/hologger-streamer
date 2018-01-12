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
    
    this._debugDrain;       //a implementar por clases que hereden de {Streamer}
    this._infoDrain;        //idem
    this._noticeDrain;      //idem
    this._warningDrain;     //idem
    this._errorDrain;       //idem
    this._criticalDrain;    //idem
    this._alertDrain;       //idem
    this._emergencyDrain;   //idem
}




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.debug = handlerFactory("debug");




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.info = handlerFactory("info");




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.notice = handlerFactory("notice");




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.warning = handlerFactory("warning");




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.error = handlerFactory("error");




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.critical = handlerFactory("critical");




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.alert = handlerFactory("alert");




/**
 * @api public
 * @description 
 * 
 */
Streamer.prototype.emergency = handlerFactory("emergency");




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