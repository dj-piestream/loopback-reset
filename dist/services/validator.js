"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredential = void 0;
const tslib_1 = require("tslib");
const isEmail = tslib_1.__importStar(require("isemail"));
const rest_1 = require("@loopback/rest");
function validateCredential(credentials) {
    if (!isEmail.validate(credentials.email)) {
        throw new rest_1.HttpErrors.UnprocessableEntity('Email is in valid!');
    }
    if (credentials.password.length < 8) {
        throw new rest_1.HttpErrors.UnprocessableEntity('password is less than 8 Characters!');
    }
}
exports.validateCredential = validateCredential;
//# sourceMappingURL=validator.js.map