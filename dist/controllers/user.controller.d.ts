import { UserRepository, Credentials, EmailObject, ResetEmailObj, TokenObject } from '../repositories';
import { User } from '../models';
import { BcryptHasher } from '../services/hash.password.bcrpty';
import { MyUserService } from '../services/user.services';
import { JWTService } from '../services/jwt.service';
export declare class UserController {
    userRepository: UserRepository;
    hasher: BcryptHasher;
    userService: MyUserService;
    tokenService: JWTService;
    constructor(userRepository: UserRepository, hasher: BcryptHasher, userService: MyUserService, tokenService: JWTService);
    signUp(userdata: User): Promise<{
        msg: string;
        userdata: User;
    }>;
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
    whoami(token: TokenObject): Promise<{
        message: string;
        email: string;
    }>;
    requestPasswordReset(emailObj: EmailObject): Promise<{
        message: string;
    }>;
    confirmPasswordReset(emailObj: ResetEmailObj): Promise<{
        token: string;
    }>;
}
