"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyUserService = void 0;
const tslib_1 = require("tslib");
const user_repository_1 = require("../repositories/user.repository");
const security_1 = require("@loopback/security");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const core_1 = require("@loopback/core");
const hash_password_bcrpty_1 = require("./hash.password.bcrpty");
const email_service_1 = require("../services/email.service");
const jwt_service_1 = require("./jwt.service");
const key_1 = require("../key");
let MyUserService = class MyUserService {
    constructor(userRepository, hasher, mailer, tokenService) {
        this.userRepository = userRepository;
        this.hasher = hasher;
        this.mailer = mailer;
        this.tokenService = tokenService;
    }
    async verifyCredentials(credentials) {
        //email check in User Model
        const foundUser = await this.userRepository.findOne({ where: { email: credentials.email } });
        if (!foundUser) {
            throw new rest_1.HttpErrors.NotFound(`User does not exist with ${credentials.email}`);
        }
        foundUser.mail_Initiated = false;
        await this.userRepository.updateById(credentials.email, foundUser);
        let checkForPassword = await this.hasher.comparePassword(credentials.password, foundUser.password);
        if (!checkForPassword) {
            throw new rest_1.HttpErrors.NotFound(`Wrong password!`);
        }
        return foundUser;
    }
    convertToUserProfile(user) {
        let userName = user.firstName + " " + user.lastName;
        return {
            [security_1.securityId]: `${user}`,
            email: `${user.email}`,
            name: `${userName}`
        };
    }
    async checkForEmailExitAndMail(email) {
        let foundUser = await this.userRepository.findOne({ where: { email } });
        if (!foundUser) {
            throw new rest_1.HttpErrors.NotFound(`User does not exist with ${email}`);
        }
        foundUser.mail_Initiated = true;
        await this.userRepository.updateById(email, foundUser);
        let userProfile = await this.convertToUserProfile(foundUser);
        let token = await this.tokenService.generateToken(userProfile, key_1.TokenServiceConstant.TOKEN_EXPRIRATION_TIME_RESET);
        let emailflag = await this.mailer.sendMail(email, "Password Reset Link!", `http://www.helloworld.com/token=${token}`);
        return emailflag;
    }
    async updateUserPassword(password, email) {
        const foundUser = await this.userRepository.findOne({ where: { email: email } });
        if (!foundUser) {
            throw new rest_1.HttpErrors.NotFound(`User does not exist with ${email}`);
        }
        if (!foundUser.mail_Initiated) {
            throw new rest_1.HttpErrors.NotFound(`Token has already been used!`);
        }
        let hashedPassword = await this.hasher.hashPassword(password);
        foundUser.password = hashedPassword;
        foundUser.mail_Initiated = false;
        try {
            await this.userRepository.updateById(email, foundUser);
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest("Update Query Failed!");
        }
        delete foundUser.password;
        let userprofile = this.convertToUserProfile(foundUser);
        let token = await this.tokenService.generateToken(userprofile, key_1.TokenServiceConstant.TOKEN_EXPRIRATION_TIME);
        return token;
    }
    async verifyUserToken(tokenObj) {
        let email = await this.tokenService.verifyToken(tokenObj);
        let foundUser = await this.userRepository.findOne({ where: { email: email } });
        if (!foundUser) {
            throw new rest_1.HttpErrors.NotFound(`User does not exist with ${email}`);
        }
        delete foundUser.password;
        return foundUser;
    }
};
MyUserService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(user_repository_1.UserRepository)),
    tslib_1.__param(1, core_1.inject(key_1.HashServiceBinding.PASSWORD_HASHER)),
    tslib_1.__param(2, core_1.inject(key_1.MailerServiceBinding.MAILER)),
    tslib_1.__param(3, core_1.inject(key_1.TokenServiceBinding.TOKEN_AUTH_SECRET)),
    tslib_1.__metadata("design:paramtypes", [user_repository_1.UserRepository,
        hash_password_bcrpty_1.BcryptHasher,
        email_service_1.MyNodeMailer,
        jwt_service_1.JWTService])
], MyUserService);
exports.MyUserService = MyUserService;
//# sourceMappingURL=user.services.js.map