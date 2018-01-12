var handlerFactory  = require("./handler-factory");


/**
 * `Streamer` constructor.
 *
 * @api public
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
 * @description 
 * 
 */
Streamer.prototype.debug = handlerFactory("debug");




/**
 * @description 
 * 
 */
Streamer.prototype.info = handlerFactory("info");




/**
 * @description 
 * 
 */
Streamer.prototype.notice = handlerFactory("notice");




/**
 * @description 
 * 
 */
Streamer.prototype.warning = handlerFactory("warning");




/**
 * @description 
 * 
 */
Streamer.prototype.error = handlerFactory("error");




/**
 * @description 
 * 
 */
Streamer.prototype.critical = handlerFactory("critical");




/**
 * @description 
 * 
 */
Streamer.prototype.alert = handlerFactory("alert");




/**
 * @description 
 * 
 */
Streamer.prototype.emergency = handlerFactory("emergency");




/**
 * @description 
 * 
 */
Streamer.prototype._composeCode = require("./compose-code");




////// MODULE EXPORTS
module.exports = Streamer;