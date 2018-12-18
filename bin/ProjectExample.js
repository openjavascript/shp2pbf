"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _clear = require("clear");

var _clear2 = _interopRequireDefault(_clear);

var _Project2 = require("./Project.js");

var _Project3 = _interopRequireDefault(_Project2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shell = require('shelljs');
var glob = require("glob");

var error = _chalk2.default.bold.red;
var warning = _chalk2.default.keyword('orange');
var success = _chalk2.default.greenBright;
var info = _chalk2.default.bold.blue;

var ProjectExample = function (_Project) {
    _inherits(ProjectExample, _Project);

    function ProjectExample(app) {
        _classCallCheck(this, ProjectExample);

        return _possibleConstructorReturn(this, (ProjectExample.__proto__ || Object.getPrototypeOf(ProjectExample)).call(this, app));
    }

    _createClass(ProjectExample, [{
        key: "init",
        value: function init() {
            //console.log( 'ProjectExample', Date.now() )
            //this.initMethod();
            this.cleanOutput();
            this.cleanBuildingKml();
            this.initBuilding();
            this.initRoad();
            this.initWater();
        }
    }, {
        key: "initWater",
        value: function initWater() {
            var _this2 = this;

            if (!(this.app.waterList && this.app.waterList.length)) return;

            this.app.waterList.map(function (item) {
                var pattern = item.source + "/**/*.kml";
                var match = glob.sync(pattern);
                if (!match.length) {
                    console.log(warning("water path: " + item.source + " do not have any .kml"));
                    return;
                }
                _fsExtra2.default.ensureDirSync(item.output);
                console.log(match);

                match.map(function (filename) {
                    var layer = void 0;
                    var cmd = "ogrinfo -ro -so -q " + filename + " | cut -d ' ' -f 2";
                    var tmp = shell.exec(cmd, { silent: true });
                    layer = tmp.stdout.trim().split('\n');
                    var dir = _path2.default.dirname(filename);

                    layer.map(function (layerItem) {
                        if (!layerItem) return;

                        var kml_desc = _this2.kmlDesc(layerItem);
                        var geojson = dir + "/" + kml_desc + ".geojson";
                        var cmd = "ogr2ogr -f \"GeoJSON\" -nln " + kml_desc + " \"" + geojson + "\" " + filename + " \"" + layerItem + "\"";
                        shell.exec(cmd);
                    });
                });

                pattern = item.source + "/**/*.geojson";
                match = glob.sync(pattern);
                if (!match.length) {
                    console.log(warning("building path: " + item.source + " do not have any .geojson "));
                    return;
                }
                _fsExtra2.default.ensureDirSync(item.output);
                var cmd = "tippecanoe --output-to-directory=" + item.output + " " + _this2.app.water_params + " " + match.join(' ');
                console.log(info(cmd));
                shell.exec(cmd);

                _this2.gzipData(item.output);
            });
        }
    }, {
        key: "initRoad",
        value: function initRoad() {
            var _this3 = this;

            if (!(this.app.roadList && this.app.roadList.length)) return;

            this.app.roadList.map(function (item) {
                var pattern = item.source + "/**/*.kml";
                var match = glob.sync(pattern);
                if (!match.length) {
                    console.log(warning("road path: " + item.source + " do not have any .kml"));
                    return;
                }
                _fsExtra2.default.ensureDirSync(item.output);
                console.log(match);

                match.map(function (filename) {
                    var layer = void 0;
                    var cmd = "ogrinfo -ro -so -q " + filename + " | cut -d ' ' -f 2";
                    var tmp = shell.exec(cmd, { silent: true });
                    layer = tmp.stdout.trim().split('\n');
                    var dir = _path2.default.dirname(filename);

                    layer.map(function (layerItem) {
                        if (!layerItem) return;

                        var kml_desc = _this3.kmlDesc(layerItem);
                        var geojson = dir + "/" + kml_desc + ".geojson";
                        var cmd = "ogr2ogr -f \"GeoJSON\" -nln " + kml_desc + " \"" + geojson + "\" " + filename + " \"" + layerItem + "\"";
                        shell.exec(cmd);
                    });
                });

                pattern = item.source + "/**/*.geojson";
                match = glob.sync(pattern);
                if (!match.length) {
                    console.log(warning("building path: " + item.source + " do not have any .geojson "));
                    return;
                }
                _fsExtra2.default.ensureDirSync(item.output);
                var cmd = "tippecanoe --output-to-directory=" + item.output + " " + _this3.app.road_params + " " + match.join(' ');
                console.log(info(cmd));
                shell.exec(cmd);

                _this3.gzipData(item.output);
            });
        }
    }, {
        key: "kmlDesc",
        value: function kmlDesc(item) {
            var kml_desc = 'unknown';
            switch (item) {
                case "道路":
                    kml_desc = "road";break;
                case "高速公路":
                    kml_desc = "highway";break;
                case "主要道路（国道、省道、环路等）":
                    kml_desc = "main_road";break;
                case "二级道路（城市主干道等）":
                    kml_desc = "second_road";break;
                case "其他道路（城镇街道、乡村道路等）":
                    kml_desc = "other_road";break;
                case "铁路":
                    kml_desc = "railway";break;
                case "水系":
                    kml_desc = "water_system";break;
                case "水域":
                    kml_desc = "water_body";break;
            }

            return kml_desc;
        }
    }, {
        key: "initBuilding",
        value: function initBuilding() {
            var _this4 = this;

            if (!(this.app.buildingList && this.app.buildingList.length)) return;

            this.app.buildingList.map(function (item) {
                var pattern = item.source + "/**/*.geojson";
                var match = glob.sync(pattern);
                if (!match.length) {
                    console.log(warning("building path: " + item.source + " do not have any .geojson "));
                    _this4.shp2geojson(item);
                    match = glob.sync(pattern);
                    if (!match.length) return;
                }
                _fsExtra2.default.ensureDirSync(item.output);
                var cmd = "tippecanoe --output-to-directory=" + item.output + " " + _this4.app.building_params + " " + match.join(' ');
                console.log(info(cmd));
                shell.exec(cmd);
                /*
                let start = 0, step = 50;
                while( start < match.length ){
                    let next = start + step;
                    let tmp = match.slice( start, next );
                    start = start + step;
                    let cmd = `tippecanoe --output-to-directory=${item.output} ${this.app.building_params} ${tmp.join(' ')}`;
                    console.log( info( cmd ) );
                    shell.exec( cmd );
                }
                */

                _this4.gzipData(item.output);
            });
        }
        /*
        gzip -d -r -S .pbf * > /dev/null;
        find . -type f -not -name "*.json" -not -name "*.pbf" -exec mv '{}' '{}'.pbf \;
        */

    }, {
        key: "gzipData",
        value: function gzipData(dir) {
            console.log("gzip at " + dir);
            var cmd = void 0;
            cmd = "gzip -d -r -S .pbf " + dir + "/*";
            shell.exec(cmd);
            cmd = "find " + dir + " -type f -not -name \"*.json\" -not -name \"*.pbf\" -exec mv '{}' '{}'.pbf \\;";
            shell.exec(cmd);
        }
    }, {
        key: "shp2geojson",
        value: function shp2geojson(item) {
            var pattern = item.source + "/**/*.shp";
            var match = glob.sync(pattern);

            console.log("auto generate .geojson in " + item.source);

            match.map(function (file) {
                var dir = _path2.default.dirname(file);
                var filename = _path2.default.posix.basename(file, '.shp');
                var cmd = "ogr2ogr -f \"GeoJSON\" -t_srs EPSG:4326 " + dir + "/" + filename + ".geojson " + file;
                shell.exec(cmd);
            });
            //console.log( match );

            return match;
        }
    }, {
        key: "cleanBuildingKml",
        value: function cleanBuildingKml() {
            console.log('remove building *.kml');
            var cmd = _path2.default.resolve(this.app.projectRoot, this.app.building_dir) + "/*.kml";
            shell.rm('-rf', cmd);
        }
    }, {
        key: "cleanOutput",
        value: function cleanOutput() {
            console.log('clean output dir');

            var cmd = '';

            if (this.app.output_building_dir) {
                cmd = _path2.default.resolve(this.app.projectRoot, this.app.output_building_dir) + "/*";
                shell.rm('-rf', cmd);
            }

            if (this.app.output_road_dir) {
                cmd = _path2.default.resolve(this.app.projectRoot, this.app.output_road_dir) + "/*";
                shell.rm('-rf', cmd);
            }

            if (this.app.output_water_dir) {
                cmd = _path2.default.resolve(this.app.projectRoot, this.app.output_water_dir) + "/*";
                shell.rm('-rf', cmd);
            }

            shell.mkdir('-p', "" + _path2.default.resolve(this.app.projectRoot, this.app.output_building_dir));
            shell.mkdir('-p', "" + _path2.default.resolve(this.app.projectRoot, this.app.output_road_dir));
            shell.mkdir('-p', "" + _path2.default.resolve(this.app.projectRoot, this.app.output_water_dir));
        }
    }]);

    return ProjectExample;
}(_Project3.default);

exports.default = ProjectExample;