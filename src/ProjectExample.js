
import fs from "fs-extra";
import path from "path";

import chalk from 'chalk';
import clear from 'clear';

const shell = require( 'shelljs' );
const glob = require("glob");

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
        //console.log( 'ProjectExample', Date.now() )
        //this.initMethod();
        this.cleanOutput();
        this.initBuilding();
    }

    cleanOutput(){
        let cmd = `${path.resolve( this.app.projectRoot, this.app.output_building_dir)}/*`;
        shell.rm( '-rf', cmd );
    }

    initBuilding(){
        if( !( this.app.buildingList && this.app.buildingList.length) ) return;

        this.app.buildingList.map( ( item ) => {
            let pattern = `${item.source}/**/*.geojson`;
            let match = glob.sync( pattern );
            if( !match.length ){
                console.log( warning( `building path: ${item.source} do not have .geojson `) );
                return;
            }
            fs.ensureDirSync( item.output );
            let cmd = `tippecanoe --output-to-directory=${item.output} ${this.app.building_params} ${match.join(' ')}`;
            /*
            console.log( match );
            console.log( item.output );
            console.log( cmd );
            */
            //shell.exec( cmd );
        });
    }
}
