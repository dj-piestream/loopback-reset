import { UserService } from '@loopback/authentication';
import { User } from '../models/user.model';
import { Credentials, UserRepository, TokenObject } from '../repositories/user.repository';
import { UserProfile } from '@loopback/security';
import { BcryptHasher } from './hash.password.bcrpty';
import { MyNodeMailer } from '../services/email.service';
import { JWTService } from './jwt.service';
export declare class MyUserService implements UserService<User, Credentials> {
    userRepository: UserRepository;
    hasher: BcryptHasher;
    mailer: MyNodeMailer;
    tokenService: JWTService;
    constructor(userRepository: UserRepository, hasher: BcryptHasher, mailer: MyNodeMailer, tokenService: JWTService);
    verifyCredentials(credentials: Credentials): Promise<User>;
    convertToUserProfile(user: User): UserProfile;
    checkForEmailExitAndMail(email: string): Promise<boolean>;
    updateUserPassword(password: string, email: string): Promise<string>;
    verifyUserToken(tokenObj: TokenObject): Promise<User>;
}
