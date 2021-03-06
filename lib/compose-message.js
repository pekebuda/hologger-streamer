var handlebars  = require('handlebars');


/**
 * @description
 * 
 * 
 * @param {String} severity     Identificador textual del nivel de logueo deseado
 * @param {Object} library      Biblioteca de codigos
 * @param {Number} isbn         Identificador numerico del evento que se desea 
 * registrar
 * @param {Mixed} info
 *
 * 
 * @return 
 */
exports = module.exports = function(severity, library, isbn, info){
    var MESSAGE;
    try {
        MESSAGE = handlebars.compile(library[severity][isbn], {noEscape:true})(info);
    } catch (e) {
        //logger(Error)
        if (info.err) MESSAGE = info.err.toString();
        //logger("Some message")
        else if (info.str) MESSAGE = info.str;
        else MESSAGE = "=========UNMATCHED CODE: " + severity + "/" + isbn + "==========";
    }
    return MESSAGE;
};