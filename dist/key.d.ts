import { BindingKey } from '@loopback/core';
import { BcryptHasher } from './services/hash.password.bcrpty';
import { MyUserService } from './services/user.services';
import { JWTService } from './services/jwt.service';
import { MyNodeMailer } from './services/email.service';
export declare namespace TokenServiceConstant {
    const TOKEN_SECRET_VALUE = "secret_value";
    const TOKEN_EXPRIRATION_TIME = "7h";
    const TOKEN_EXPRIRATION_TIME_RESET = "300000";
    const ROUND = 10;
}
export declare namespace TokenServiceBinding {
    const TOKEN_AUTH_SECRET: BindingKey<JWTService>;
}
export declare namespace HASHServiceConstant {
    const ROUND = 10;
    const PASSWORD_HASHER_ROUND: BindingKey<number>;
}
export declare namespace HashServiceBinding {
    const PASSWORD_HASHER: BindingKey<BcryptHasher>;
}
export declare namespace MailerServiceBinding {
    const MAILER: BindingKey<MyNodeMailer>;
    const CONFIG_TEXT: BindingKey<object>;
}
export declare namespace UserServiceBinding {
    const USER_SERVICE: BindingKey<MyUserService>;
}
export declare namespace EmailServiceConstant {
    const CONFIG_OPTION: {
        type: string;
        host: string;
        secure: boolean;
        port: number;
        tls: {
            rejectUnauthorized: boolean;
        };
        auth: {
            user: string;
            pass: string;
        };
    };
}
