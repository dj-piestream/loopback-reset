"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const util_1 = require("util");
var jwt = require('jsonwebtoken');
const signAsync = util_1.promisify(jwt.sign);
const verifyAsync = util_1.promisify(jwt.verify);
const rest_1 = require("@loopback/rest");
const key_1 = require("../key");
class JWTService {
    async generateToken(userProfile, expiresIn) {
        if (!userProfile) {
            throw new rest_1.HttpErrors.NotFound(`userProfile is null!`);
        }
        let token = '';
        try {
            token = await signAsync(userProfile, key_1.TokenServiceConstant.TOKEN_SECRET_VALUE, { expiresIn: expiresIn });
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized(`error generating token ${err}`);
        }
        return token;
    }
    async verifyToken(tokenObj) {
        let data = await verifyAsync(tokenObj.token, key_1.TokenServiceConstant.TOKEN_SECRET_VALUE);
        return data.email;
    }
}
exports.JWTService = JWTService;
//# sourceMappingURL=jwt.service.js.map