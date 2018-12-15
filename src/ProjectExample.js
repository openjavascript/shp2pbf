
import fs from "fs";
import path from "path";

import chalk from 'chalk';
import clear from 'clear';


const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.greenBright;
const info = chalk.bold.blue;

import Project from './Project.js';

export default class ProjectExample extends Project {
    constructor( app ){
        super( app );
    }

    init() {
        console.log( 'ProjectExample', Date.now() )
        this.initMethod();
    }
}
