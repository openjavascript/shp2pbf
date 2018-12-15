#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const get_args = require('./utils/get_args.js');

const APP_ROOT = path.resolve(__dirname, '..');
let PROJECT_ROOT = process.env.PWD;

let args = get_args(process);

if( args.length && /\//.test( args[0] ) ){
    PROJECT_ROOT = path.resolve( args[0] );
}

const pack = fs.readFileSync( `${APP_ROOT}/package.json`, 'utf8' );
const packJSON = JSON.parse( pack );

/*
console.log( args, PROJECT_ROOT );
return;
*/

require('babel-core/register');
const init = require( './app' ).init;
init( APP_ROOT, PROJECT_ROOT, packJSON );
