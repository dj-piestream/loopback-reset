import {UserService} from '@loopback/authentication';
import {User} from '../models/user.model';
import {Credentials, UserRepository, TokenObject} from '../repositories/user.repository';
import {securityId, UserProfile } from '@loopback/security';
import { repository, Entity } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { inject } from '@loopback/core';
import { BcryptHasher } from './hash.password.bcrpty';
import {MyNodeMailer} from '../services/email.service';
import { JWTService } from './jwt.service';
import {TokenServiceConstant, TokenServiceBinding, HashServiceBinding, MailerServiceBinding} from '../key';

export class MyUserService implements UserService<User, Credentials>{

    constructor(
        @repository(UserRepository)
        public userRepository:UserRepository,
        @inject(HashServiceBinding.PASSWORD_HASHER)
        public hasher : BcryptHasher,
        @inject(MailerServiceBinding.MAILER)
        public mailer : MyNodeMailer,
        @inject(TokenServiceBinding.TOKEN_AUTH_SECRET)
        public tokenService : JWTService  
    ){}


    async verifyCredentials(credentials: Credentials): Promise<User> {
        //email check in User Model
        const foundUser = await this.userRepository.findOne({where:{email:credentials.email}});
        if(!foundUser){
            throw new HttpErrors.NotFound(`User does not exist with ${credentials.email}`);
        }
        foundUser.mail_Initiated = false;
        await this.userRepository.updateById(credentials.email,foundUser);
        let checkForPassword = await this.hasher.comparePassword(credentials.password, foundUser.password);
        if(!checkForPassword){
            throw new HttpErrors.NotFound(`Wrong password!`);
        }
        return foundUser;
    }
    convertToUserProfile(user: User): UserProfile {
        let userName : string = user.firstName + " " + user.lastName;
        return { 
            [securityId] :`${user}`,
             email : `${user.email}`,
            name:`${userName}`
        }
    }
    async checkForEmailExitAndMail(email:string){
        let foundUser = await this.userRepository.findOne({where:{email}});
        if(!foundUser){
            throw new HttpErrors.NotFound(`User does not exist with ${email}`);
        }
        foundUser.mail_Initiated = true;
        await this.userRepository.updateById(email,foundUser);
        let userProfile = await this.convertToUserProfile(foundUser);
        let token = await this.tokenService.generateToken(userProfile, TokenServiceConstant.TOKEN_EXPRIRATION_TIME_RESET);
        let emailflag = await this.mailer.sendMail(email, "Password Reset Link!", `http://www.helloworld.com/token=${token}`);
        return emailflag;
    }
    async updateUserPassword(password: string, email: string): Promise<string>{
        const foundUser = await this.userRepository.findOne({where:{email:email}});
        if(!foundUser){
            throw new HttpErrors.NotFound(`User does not exist with ${email}`);
        }
        if(!foundUser.mail_Initiated){
            throw new HttpErrors.NotFound(`Token has already been used!`);
        }
        let hashedPassword = await this.hasher.hashPassword(password);
        foundUser.password = hashedPassword;
        foundUser.mail_Initiated = false;
        try{
            await this.userRepository.updateById(email,foundUser);
        }catch(err){
            throw new HttpErrors.BadRequest("Update Query Failed!")
        }
        delete foundUser.password;
        let userprofile = this.convertToUserProfile(foundUser);
        let token = await this.tokenService.generateToken(userprofile,TokenServiceConstant.TOKEN_EXPRIRATION_TIME);
        return token;
    }
    async verifyUserToken(tokenObj: TokenObject): Promise<User> {
        let email = await this.tokenService.verifyToken(tokenObj);
        let foundUser = await this.userRepository.findOne({where:{email:email}});
        if(!foundUser){
            throw new HttpErrors.NotFound(`User does not exist with ${email}`);
        }
        delete foundUser.password;
        return foundUser;
    }
    
}