"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.updatePlayerFields = exports.getPlayerFields = exports.getPlayersList = exports.getPlayerBySteamId = exports.getPlayerById = void 0;
var database_1 = __importDefault(require("./../../../init/database"));
var teams_1 = require("../teams");
var players = database_1["default"].players, custom = database_1["default"].custom;
function getPlayerById(id, avatar) {
    if (avatar === void 0) { avatar = false; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res) {
                    players.findOne({ _id: id }, function (err, player) {
                        if (err) {
                            return res(null);
                        }
                        if (!avatar && player && player.avatar)
                            delete player.avatar;
                        return res(player);
                    });
                })];
        });
    });
}
exports.getPlayerById = getPlayerById;
function getPlayerBySteamId(steamid, avatar) {
    if (avatar === void 0) { avatar = false; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res) {
                    players.findOne({ steamid: steamid }, function (err, player) {
                        if (err) {
                            return res(null);
                        }
                        if (!avatar && player && player.avatar)
                            delete player.avatar;
                        return res(player);
                    });
                })];
        });
    });
}
exports.getPlayerBySteamId = getPlayerBySteamId;
exports.getPlayersList = function (query) {
    return new Promise(function (res) {
        players.find(query, function (err, players) {
            if (err) {
                return res([]);
            }
            return res(players);
        });
    });
};
exports.getPlayerFields = function () { return __awaiter(void 0, void 0, void 0, function () {
    var store;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, teams_1.initiateCustomFields()];
            case 1:
                store = _a.sent();
                if (!store)
                    return [2 /*return*/, []];
                return [2 /*return*/, store.players];
        }
    });
}); };
exports.updatePlayerFields = function (playerFields) { return __awaiter(void 0, void 0, void 0, function () {
    var store, deletedFields, createdFields;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, teams_1.initiateCustomFields()];
            case 1:
                store = _a.sent();
                deletedFields = store.players.filter(function (field) { return !playerFields.find(function (newField) { return newField.name === field.name; }); });
                createdFields = playerFields.filter(function (newField) { return !store.players.find(function (field) { return field.name === newField.name; }); });
                return [2 /*return*/, new Promise(function (res) {
                        custom.update({}, { $set: { players: playerFields } }, { multi: true }, function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a, updateQuery, _i, deletedFields_1, deletedField, _b, createdFields_1, createdField;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (!(!deletedFields.length && !createdFields.length)) return [3 /*break*/, 2];
                                        _a = res;
                                        return [4 /*yield*/, teams_1.initiateCustomFields()];
                                    case 1: return [2 /*return*/, _a.apply(void 0, [_c.sent()])];
                                    case 2:
                                        updateQuery = {
                                            $unset: {},
                                            $set: {}
                                        };
                                        for (_i = 0, deletedFields_1 = deletedFields; _i < deletedFields_1.length; _i++) {
                                            deletedField = deletedFields_1[_i];
                                            updateQuery.$unset["extra." + deletedField.name] = true;
                                        }
                                        for (_b = 0, createdFields_1 = createdFields; _b < createdFields_1.length; _b++) {
                                            createdField = createdFields_1[_b];
                                            updateQuery.$set["extra." + createdField.name] = '';
                                        }
                                        players.update({}, updateQuery, { multi: true }, function () { return __awaiter(void 0, void 0, void 0, function () {
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        _a = res;
                                                        return [4 /*yield*/, teams_1.initiateCustomFields()];
                                                    case 1:
                                                        _a.apply(void 0, [_b.sent()]);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
        }
    });
}); };
