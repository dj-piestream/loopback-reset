"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyNodeMailer = void 0;
const tslib_1 = require("tslib");
const nodemailer = tslib_1.__importStar(require("nodemailer"));
const core_1 = require("@loopback/core");
const key_1 = require("../key");
let MyNodeMailer = class MyNodeMailer {
    constructor(configObj) {
        this.configObj = configObj;
    }
    async sendMail(to, subject, body) {
        let transporter = await nodemailer.createTransport(this.configObj);
        let mailObj = {
            from: "chitranshdhananjai1995@gmail.com",
            to: to,
            subject: subject,
            html: body
        };
        let data = await transporter.sendMail(mailObj);
        return data;
    }
};
MyNodeMailer = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject(key_1.MailerServiceBinding.CONFIG_TEXT)),
    tslib_1.__metadata("design:paramtypes", [Object])
], MyNodeMailer);
exports.MyNodeMailer = MyNodeMailer;
//# sourceMappingURL=email.service.js.map