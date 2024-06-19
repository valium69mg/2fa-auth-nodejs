// GENERATE TOKEN OF THE USER
module.exports.genToken = function() {
    let code = "";
    for (i = 0; i < 5; i++) {
       code = code.concat((Math.floor(Math.random() * 9)).toString());
    }
    return code;
}
