"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.init = init;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _clear = require("clear");

var _clear2 = _interopRequireDefault(_clear);

var _figlet = require("figlet");

var _figlet2 = _interopRequireDefault(_figlet);

var _shelljs = require("shelljs");

var _shelljs2 = _interopRequireDefault(_shelljs);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _constant = require("./data/constant.js");

var CONST = _interopRequireWildcard(_constant);

var _data = require("./data/data.js");

var DATA = _interopRequireWildcard(_data);

var _ProjectExample = require("./ProjectExample.js");

var _ProjectExample2 = _interopRequireDefault(_ProjectExample);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var error = _chalk2.default.bold.red;
var warning = _chalk2.default.keyword('orange');
var success = _chalk2.default.greenBright;
var info = _chalk2.default.bold.blue;

var App = function () {
    function App(appRoot, projectRoot, packJSON, osName) {
        _classCallCheck(this, App);

        this.appRoot = appRoot;
        this.projectRoot = projectRoot;
        this.packJSON = packJSON;
        this.osName = osName;

        console.log(['appRoot: ' + this.appRoot, 'projectRoot: ' + this.projectRoot].join("\n"));

        this.init();

        console.log();
    }

    _createClass(App, [{
        key: "init",
        value: function init() {
            var _this = this;

            (0, _clear2.default)();

            this.project;
            this.prompt = _inquirer2.default.createPromptModule();
            this.welcome();

            this.system = 1;

            /*
            shell.exec(  [ 
                'cd ' + this.projectRoot
                , 'git config core.fileMode false && git config core.autocrlf false'
            ].join('&&') );
            */

            console.log();

            new Promise(function (resolve) {
                setTimeout(resolve, 1);
                //}).then( () => {
                /*            return this.getSourceDir();*/
                //}).then( () => {
                //return this.getOutputDir();
            }).then(function () {
                return _this.getCityName();
            }).then(function () {
                return _this.getBuildingDir();
            }).then(function () {
                return _this.getBuildingParams();
            }).then(function () {
                return _this.getOutputBuildingDir();
            }).then(function () {
                _this.isGood = 1;

                //this.isGood = 0;
                return new Promise(function (resolve) {
                    setTimeout(resolve, 1);
                });
            }).then(function () {
                if (!_this.isGood) {
                    _this.confirm = 'no';
                    return;
                }
                return _this.getConfirm();
            }).then(function () {
                if (_this.confirm == 'no') return;
                _this.project = new _ProjectExample2.default(_this);
            });
        }
    }, {
        key: "getOutputBuildingDir",
        value: async function getOutputBuildingDir() {
            var data = await this.prompt(DATA.Q_OUTPUT_BUILDING_DIR);
            this.output_building_dir = data.output_building_dir;
        }
    }, {
        key: "getBuildingParams",
        value: async function getBuildingParams() {
            var data = await this.prompt(DATA.Q_BUILDING_PARAMS);
            this.building_params = data.building_params;
        }
    }, {
        key: "getBuildingDir",
        value: async function getBuildingDir() {
            var data = await this.prompt(DATA.Q_BUILDING_DIR);
            this.building_dir = data.building_dir;
        }
    }, {
        key: "getCityName",
        value: async function getCityName() {
            var data = await this.prompt(DATA.Q_CITY_NAME);
            this.city_name = data.city_name;
        }
    }, {
        key: "getSourceDir",
        value: async function getSourceDir() {
            var data = await this.prompt(DATA.Q_SOURCE_DIR);
            this.source_dir = data.source_dir;
        }
    }, {
        key: "getOutputDir",
        value: async function getOutputDir() {
            var data = await this.prompt(DATA.Q_OUTPUT_DIR);
            this.output_dir = data.output_dir;
        }
    }, {
        key: "getConfirm",
        value: async function getConfirm() {
            var data = await this.prompt(DATA.Q_CONFIRM);
            this.confirm = data.confirm;
        }
    }, {
        key: "getExample",
        value: async function getExample() {
            var data = await this.prompt(DATA.Q_EXAMPLE);
            this.example = data.example;
        }
    }, {
        key: "fileExists",
        value: function fileExists(file) {
            return _fs2.default.existsSync(file);
        }
    }, {
        key: "welcome",
        value: function welcome() {
            console.log(_chalk2.default.yellow(_figlet2.default.textSync(CONST.APPNAME, { horizontalLayout: 'full' })));
            console.log(_chalk2.default.bold.yellow(CONST.TITLE + " - " + this.packJSON.version));
            console.log();
            console.log(info("github: " + this.packJSON.repository.url));

            console.log();
            console.log(info('使用:'));
            console.log(info('     方法1: 使用说明'));
            console.log();
            console.log(info('     方法2: 使用说明'));
            console.log();
        }
    }]);

    return App;
}();

exports.default = App;
function init(APP_ROOT, PROJECT_ROOT, packJSON) {
    var AppIns = new App(APP_ROOT, PROJECT_ROOT, packJSON);
}