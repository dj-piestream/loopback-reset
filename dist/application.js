"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnLoopbackFourApplication = void 0;
const tslib_1 = require("tslib");
const boot_1 = require("@loopback/boot");
const rest_explorer_1 = require("@loopback/rest-explorer");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = tslib_1.__importDefault(require("path"));
const sequence_1 = require("./sequence");
const hash_password_bcrpty_1 = require("./services/hash.password.bcrpty");
const user_services_1 = require("./services/user.services");
const jwt_service_1 = require("./services/jwt.service");
const email_service_1 = require("./services/email.service");
const key_1 = require("./key");
class LearnLoopbackFourApplication extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        //setup Binding
        this.setBinding();
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
    setBinding() {
        this.bind(key_1.HashServiceBinding.PASSWORD_HASHER).toClass(hash_password_bcrpty_1.BcryptHasher);
        this.bind(key_1.HASHServiceConstant.PASSWORD_HASHER_ROUND).to(key_1.HASHServiceConstant.ROUND);
        this.bind(key_1.UserServiceBinding.USER_SERVICE).toClass(user_services_1.MyUserService);
        this.bind(key_1.TokenServiceBinding.TOKEN_AUTH_SECRET).toClass(jwt_service_1.JWTService);
        this.bind(key_1.MailerServiceBinding.MAILER).toClass(email_service_1.MyNodeMailer);
        this.bind(key_1.MailerServiceBinding.CONFIG_TEXT).to(key_1.EmailServiceConstant.CONFIG_OPTION);
    }
}
exports.LearnLoopbackFourApplication = LearnLoopbackFourApplication;
//# sourceMappingURL=application.js.map