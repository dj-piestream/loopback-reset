import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import { BcryptHasher } from './services/hash.password.bcrpty';
import { MyUserService } from './services/user.services';
import { JWTService } from './services/jwt.service';
import { MyNodeMailer } from './services/email.service';
import { MailerServiceBinding, TokenServiceConstant, TokenServiceBinding, HashServiceBinding, UserServiceBinding, HASHServiceConstant, EmailServiceConstant } from './key';

export {ApplicationConfig};

export class LearnLoopbackFourApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    //setup Binding
    this.setBinding();

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

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

  setBinding(){
    this.bind(HashServiceBinding.PASSWORD_HASHER).toClass(BcryptHasher);
    this.bind(HASHServiceConstant.PASSWORD_HASHER_ROUND).to(HASHServiceConstant.ROUND);
    this.bind(UserServiceBinding.USER_SERVICE).toClass(MyUserService);
    this.bind(TokenServiceBinding.TOKEN_AUTH_SECRET).toClass(JWTService);
    this.bind(MailerServiceBinding.MAILER).toClass(MyNodeMailer);
    this.bind(MailerServiceBinding.CONFIG_TEXT).to(EmailServiceConstant.CONFIG_OPTION);
  }
}
