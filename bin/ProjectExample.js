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
            this.initBuilding();
        }
    }, {
        key: "cleanOutput",
        value: function cleanOutput() {
            var cmd = _path2.default.resolve(this.app.projectRoot, this.app.output_building_dir) + "/*";
            shell.rm('-rf', cmd);
        }
    }, {
        key: "initBuilding",
        value: function initBuilding() {
            var _this2 = this;

            if (!(this.app.buildingList && this.app.buildingList.length)) return;

            this.app.buildingList.map(function (item) {
                var pattern = item.source + "/**/*.geojson";
                var match = glob.sync(pattern);
                if (!match.length) {
                    console.log(warning("building path: " + item.source + " do not have .geojson "));
                    return;
                }
                _fsExtra2.default.ensureDirSync(item.output);
                var cmd = "tippecanoe --output-to-directory=" + item.output + " " + _this2.app.building_params + " " + match.join(' ');
                /*
                console.log( match );
                console.log( item.output );
                console.log( cmd );
                */
                //shell.exec( cmd );
            });
        }
    }]);

    return ProjectExample;
}(_Project3.default);

exports.default = ProjectExample;