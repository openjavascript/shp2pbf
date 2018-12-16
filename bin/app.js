"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.init = init;

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

                var tmp = _this.resolveDir(_this.building_dir, _this.output_building_dir);

                console.log(tmp);

                var space = '        ';

                console.log(space + 'os-release:', _this.osName);

                //this.isGood = 0;
                return new Promise(function (resolve) {
                    setTimeout(resolve, 1);
                });
            }).then(function () {

                if (!(_shelljs2.default.which('tippecanoe') && _shelljs2.default.which('ogrinfo') && _shelljs2.default.which('ogr2ogr')
                //&& shell.which( 'notexitst' )  
                )) {
                    return _this.getConfirmInstallTools();
                }

                return new Promise(function (resolve) {
                    setTimeout(resolve, 1);
                });
            }).then(function () {
                if (_this.confirm_install_tools && _this.confirm_install_tools == 'yes') {
                    var shellFile = "/bin/bash " + _this.appRoot + "/shell/" + _this.osName + ".sh";
                    _shelljs2.default.exec(shellFile);
                }
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
        key: "resolveDir",
        value: function resolveDir(src, output) {
            var r = [];

            if (this.city_name) {
                r = this.resolveDirCityName(src, output, this.city_name);
            } else {
                r = this.resolveDirBatch(src, output);
            }

            return r;
        }
    }, {
        key: "resolveDirCityName",
        value: function resolveDirCityName(src, output, cityName) {
            var r = [];

            var obj = {};
            var tmp = _path2.default.resolve(this.projectRoot, src, cityName);
            var postfix = this.getPostfixName(src);

            if (_fsExtra2.default.pathExistsSync(tmp)) {
                obj.src = tmp;
            }

            if (!obj.src) {
                tmp = _path2.default.resolve(this.projectRoot, src, cityName + ['_', postfix].join(''));
                if (_fsExtra2.default.pathExistsSync(tmp)) {
                    obj.src = tmp;
                }
            }
            if (!obj.src) return r;

            obj.cityName = cityName;
            tmp = _path2.default.resolve(this.projectRoot, output, obj.cityName.replace(/shi$/i, '') + 'shi');

            obj.out = tmp;

            r.push(obj);

            return r;
        }
    }, {
        key: "getPostfixName",
        value: function getPostfixName(dir) {
            var r = '';
            r = dir.replace(/\/$/, '').split('/');
            r = r[r.length - 1] || '';

            return r;
        }
    }, {
        key: "getDirCityName",
        value: function getDirCityName(dir) {
            var r = '';

            r = dir.replace(/.*\//, '');
            r = r.replace(/\_.*/, '');
            r = r.replace(/shi$/, '');

            return r;
        }
    }, {
        key: "resolveDirBatch",
        value: function resolveDirBatch(src, output) {
            var _this2 = this;

            var r = [];

            var dir = _path2.default.resolve(this.projectRoot, src);

            var dirList = _fsExtra2.default.readdirSync(dir);

            var p = this;

            dirList.map(function (item) {
                var obj = {};

                obj.src = _path2.default.resolve(dir, item);
                obj.cityName = p.getDirCityName(item);
                obj.out = _path2.default.resolve(_this2.projectRoot, output, obj.cityName.replace(/shi$/i, '') + 'shi');

                r.push(obj);
            });

            return r;
        }
    }, {
        key: "getOutputBuildingDir",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.prompt(DATA.Q_OUTPUT_BUILDING_DIR);

                            case 2:
                                data = _context.sent;

                                this.output_building_dir = data.output_building_dir;

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getOutputBuildingDir() {
                return _ref.apply(this, arguments);
            }

            return getOutputBuildingDir;
        }()
    }, {
        key: "getBuildingParams",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var data;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.prompt(DATA.Q_BUILDING_PARAMS);

                            case 2:
                                data = _context2.sent;

                                this.building_params = data.building_params;

                            case 4:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getBuildingParams() {
                return _ref2.apply(this, arguments);
            }

            return getBuildingParams;
        }()
    }, {
        key: "getBuildingDir",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var data;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.prompt(DATA.Q_BUILDING_DIR);

                            case 2:
                                data = _context3.sent;

                                this.building_dir = data.building_dir;

                            case 4:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getBuildingDir() {
                return _ref3.apply(this, arguments);
            }

            return getBuildingDir;
        }()
    }, {
        key: "getCityName",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var data;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.prompt(DATA.Q_CITY_NAME);

                            case 2:
                                data = _context4.sent;

                                this.city_name = data.city_name;

                            case 4:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getCityName() {
                return _ref4.apply(this, arguments);
            }

            return getCityName;
        }()
    }, {
        key: "getSourceDir",
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var data;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.prompt(DATA.Q_SOURCE_DIR);

                            case 2:
                                data = _context5.sent;

                                this.source_dir = data.source_dir;

                            case 4:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function getSourceDir() {
                return _ref5.apply(this, arguments);
            }

            return getSourceDir;
        }()
    }, {
        key: "getOutputDir",
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var data;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this.prompt(DATA.Q_OUTPUT_DIR);

                            case 2:
                                data = _context6.sent;

                                this.output_dir = data.output_dir;

                            case 4:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function getOutputDir() {
                return _ref6.apply(this, arguments);
            }

            return getOutputDir;
        }()
    }, {
        key: "getConfirmInstallTools",
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var data;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return this.prompt(DATA.Q_CONFIRM_INSTALL_TOOLS);

                            case 2:
                                data = _context7.sent;

                                this.confirm_install_tools = data.confirm_install_tools;

                            case 4:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function getConfirmInstallTools() {
                return _ref7.apply(this, arguments);
            }

            return getConfirmInstallTools;
        }()
    }, {
        key: "getConfirm",
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var data;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return this.prompt(DATA.Q_CONFIRM);

                            case 2:
                                data = _context8.sent;

                                this.confirm = data.confirm;

                            case 4:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function getConfirm() {
                return _ref8.apply(this, arguments);
            }

            return getConfirm;
        }()
    }, {
        key: "getExample",
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                var data;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return this.prompt(DATA.Q_EXAMPLE);

                            case 2:
                                data = _context9.sent;

                                this.example = data.example;

                            case 4:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function getExample() {
                return _ref9.apply(this, arguments);
            }

            return getExample;
        }()
    }, {
        key: "fileExists",
        value: function fileExists(file) {
            return _fsExtra2.default.existsSync(file);
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
function init(APP_ROOT, PROJECT_ROOT, packJSON, osName) {
    var AppIns = new App(APP_ROOT, PROJECT_ROOT, packJSON, osName);
}