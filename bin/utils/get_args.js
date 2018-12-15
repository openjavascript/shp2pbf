"use strict";

module.exports = function (process) {
    var _r = [];

    //console.log( 'process', process.argv.length );

    if (process.argv.length > 2) {
        for (var i = 2, j = process.argv.length; i < j; i++) {
            //console.log( i, process.argv[i] );
            _r.push(process.argv[i].trim());
        }
    }
    //console.log( 'r', _r );
    return _r;
};