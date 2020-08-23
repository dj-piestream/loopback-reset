import {BindingKey} from '@loopback/core';
import { BcryptHasher } from './services/hash.password.bcrpty';
import { MyUserService } from './services/user.services';
import { JWTService } from './services/jwt.service';
import { MyNodeMailer } from './services/email.service';

export namespace TokenServiceConstant {
    export const TOKEN_SECRET_VALUE = 'secret_value'
    export const TOKEN_EXPRIRATION_TIME = '7h'
    export const TOKEN_EXPRIRATION_TIME_RESET = '300000'
    export const ROUND = 10
}

export namespace TokenServiceBinding {
    export const TOKEN_AUTH_SECRET = BindingKey.create<JWTService>("authorization.token");
}

export namespace HASHServiceConstant {
    export const ROUND = 10
    export const PASSWORD_HASHER_ROUND = BindingKey.create<number>('round');
}
export namespace HashServiceBinding {
    export const PASSWORD_HASHER = BindingKey.create<BcryptHasher>('service.hasher');
}

export namespace MailerServiceBinding {
    export const MAILER = BindingKey.create<MyNodeMailer>('service.email');
    export const CONFIG_TEXT = BindingKey.create<object>('config.email');
}

export namespace UserServiceBinding {
    export const USER_SERVICE = BindingKey.create<MyUserService>('service.user.service');
}

export namespace EmailServiceConstant {
    export const CONFIG_OPTION = {
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

}