"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const repositories_1 = require("../repositories");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const validator_1 = require("../services/validator");
const core_1 = require("@loopback/core");
const hash_password_bcrpty_1 = require("../services/hash.password.bcrpty");
const user_controller_spec_1 = require("../controllers/specs/user.controller.spec");
const user_services_1 = require("../services/user.services");
const jwt_service_1 = require("../services/jwt.service");
const key_1 = require("../key");
let UserController = class UserController {
    constructor(userRepository, hasher, userService, tokenService) {
        this.userRepository = userRepository;
        this.hasher = hasher;
        this.userService = userService;
        this.tokenService = tokenService;
    }
    //SignUp
    async signUp(userdata) {
        validator_1.validateCredential(lodash_1.default.pick(userdata, ["email", 'password']));
        userdata.password = await this.hasher.hashPassword(userdata.password);
        let savedUser;
        try {
            savedUser = await this.userRepository.create(userdata);
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest(`Issue While creating ${err}`);
        }
        delete savedUser.password;
        let tosendobj = {
            "msg": "Sucess",
            "userdata": savedUser
        };
        return tosendobj;
    }
    //Login
    async login(credentials) {
        console.log(credentials.email);
        let validatedCred = await this.userService.verifyCredentials(credentials);
        let userProfile = await this.userService.convertToUserProfile(validatedCred);
        var token = await this.tokenService.generateToken(userProfile, key_1.TokenServiceConstant.TOKEN_EXPRIRATION_TIME);
        return { token };
    }
    //verify-Token-whoAmI
    async whoami(token) {
        let data = await this.userService.verifyUserToken(token);
        console.log("Contoller", data);
        return {
            message: "User data will be shared!",
            email: data.email
        };
    }
    //request-password-reset
    async requestPasswordReset(emailObj) {
        let strEmail = emailObj.email;
        var send = await this.userService.checkForEmailExitAndMail(strEmail);
        if (!send) {
            throw new rest_1.HttpErrors.NotFound("Email not sent!");
        }
        return {
            message: "mail is sucessfully send!"
        };
    }
    //confirm-password-reset
    async confirmPasswordReset(emailObj) {
        let { token, email, password, confirmPassword } = emailObj;
        if (password != confirmPassword) {
            throw new rest_1.HttpErrors.NotAcceptable("Value of password are not equal!");
        }
        let metadata = await this.userService.verifyUserToken({ token });
        if (metadata.email != email) {
            throw new rest_1.HttpErrors.NotAcceptable(`Email "${email}" not Found!`);
        }
        let tokenGen = await this.userService.updateUserPassword(password, email);
        if (!tokenGen) {
            throw new rest_1.HttpErrors.NotAcceptable("Token generation issue!");
        }
        return {
            token: tokenGen
        };
    }
};
tslib_1.__decorate([
    rest_1.post("/user/signUp", {
        responses: {
            '200': {
                decription: 'User',
                content: {
                    schema: rest_1.getJsonSchema(repositories_1.UserRepository)
                }
            }
        }
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
tslib_1.__decorate([
    rest_1.post("/user/login", {
        responses: {
            '200': {
                decription: 'token',
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                token: {
                                    "type": "string"
                                },
                            }
                        }
                    }
                }
            }
        }
    }),
    tslib_1.__param(0, rest_1.requestBody(user_controller_spec_1.CreadentialRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    rest_1.post('/user/whoami', {
        responses: {
            '200': {
                description: 'Meta User based on token!!',
                content: {
                    'application/json': {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    "type": "string"
                                },
                                email: {
                                    "type": "string"
                                },
                            }
                        }
                    }
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody(user_controller_spec_1.TokenRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "whoami", null);
tslib_1.__decorate([
    rest_1.post('/user/request-password-reset', {
        responses: {
            '200': {
                description: 'Reset password for User!!',
                content: {
                    'application/json': {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    "type": "string"
                                },
                            }
                        }
                    }
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody(user_controller_spec_1.EmailRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "requestPasswordReset", null);
tslib_1.__decorate([
    rest_1.post('/user/confirm-password-reset', {
        responses: {
            '200': {
                description: 'Comfirm password reset',
                content: {
                    'application/json': {
                        schema: {
                            type: "object",
                            properties: {
                                token: {
                                    "type": "string"
                                },
                            }
                        }
                    }
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody(user_controller_spec_1.ConfirmRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "confirmPasswordReset", null);
UserController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__param(1, core_1.inject(key_1.HashServiceBinding.PASSWORD_HASHER)),
    tslib_1.__param(2, core_1.inject(key_1.UserServiceBinding.USER_SERVICE)),
    tslib_1.__param(3, core_1.inject(key_1.TokenServiceBinding.TOKEN_AUTH_SECRET)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        hash_password_bcrpty_1.BcryptHasher,
        user_services_1.MyUserService,
        jwt_service_1.JWTService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map