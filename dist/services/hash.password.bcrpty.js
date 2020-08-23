"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptHasher = void 0;
const tslib_1 = require("tslib");
const bcryptjs_1 = require("bcryptjs");
const core_1 = require("@loopback/core");
const key_1 = require("../key");
class BcryptHasher {
    async hashPassword(password) {
        const salt = await bcryptjs_1.genSalt(this.round);
        return await bcryptjs_1.hash(password, salt);
    }
    async comparePassword(passwordFromRequest, storedPassword) {
        let compared = await bcryptjs_1.compare(passwordFromRequest, storedPassword);
        return compared;
    }
}
tslib_1.__decorate([
    core_1.inject(key_1.HASHServiceConstant.PASSWORD_HASHER_ROUND),
    tslib_1.__metadata("design:type", Number)
], BcryptHasher.prototype, "round", void 0);
exports.BcryptHasher = BcryptHasher;
//# sourceMappingURL=hash.password.bcrpty.js.map