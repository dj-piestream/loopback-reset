"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailServiceConstant = exports.UserServiceBinding = exports.MailerServiceBinding = exports.HashServiceBinding = exports.HASHServiceConstant = exports.TokenServiceBinding = exports.TokenServiceConstant = void 0;
const core_1 = require("@loopback/core");
var TokenServiceConstant;
(function (TokenServiceConstant) {
    TokenServiceConstant.TOKEN_SECRET_VALUE = 'secret_value';
    TokenServiceConstant.TOKEN_EXPRIRATION_TIME = '7h';
    TokenServiceConstant.TOKEN_EXPRIRATION_TIME_RESET = '300000';
    TokenServiceConstant.ROUND = 10;
})(TokenServiceConstant = exports.TokenServiceConstant || (exports.TokenServiceConstant = {}));
var TokenServiceBinding;
(function (TokenServiceBinding) {
    TokenServiceBinding.TOKEN_AUTH_SECRET = core_1.BindingKey.create("authorization.token");
})(TokenServiceBinding = exports.TokenServiceBinding || (exports.TokenServiceBinding = {}));
var HASHServiceConstant;
(function (HASHServiceConstant) {
    HASHServiceConstant.ROUND = 10;
    HASHServiceConstant.PASSWORD_HASHER_ROUND = core_1.BindingKey.create('round');
})(HASHServiceConstant = exports.HASHServiceConstant || (exports.HASHServiceConstant = {}));
var HashServiceBinding;
(function (HashServiceBinding) {
    HashServiceBinding.PASSWORD_HASHER = core_1.BindingKey.create('service.hasher');
})(HashServiceBinding = exports.HashServiceBinding || (exports.HashServiceBinding = {}));
var MailerServiceBinding;
(function (MailerServiceBinding) {
    MailerServiceBinding.MAILER = core_1.BindingKey.create('service.email');
    MailerServiceBinding.CONFIG_TEXT = core_1.BindingKey.create('config.email');
})(MailerServiceBinding = exports.MailerServiceBinding || (exports.MailerServiceBinding = {}));
var UserServiceBinding;
(function (UserServiceBinding) {
    UserServiceBinding.USER_SERVICE = core_1.BindingKey.create('service.user.service');
})(UserServiceBinding = exports.UserServiceBinding || (exports.UserServiceBinding = {}));
var EmailServiceConstant;
(function (EmailServiceConstant) {
    EmailServiceConstant.CONFIG_OPTION = {
        "type": "smtp",
        "host": "smtp.gmail.com",
        "secure": true,
        "port": 465,
        "tls": {
            "rejectUnauthorized": false
        },
        "auth": {
            "user": "mailermandhananjai@gmail.com",
            "pass": "per4mance"
        }
    };
})(EmailServiceConstant = exports.EmailServiceConstant || (exports.EmailServiceConstant = {}));
//# sourceMappingURL=key.js.map