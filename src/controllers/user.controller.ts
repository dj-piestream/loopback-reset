// Uncomment these imports to begin using these cool features!

import { UserRepository , Credentials, EmailObject, ResetEmailObj, TokenObject} from '../repositories';
import { repository } from '@loopback/repository';
import { post, getJsonSchema, requestBody, getModelSchemaRef, HttpErrors } from '@loopback/rest';
import { User } from '../models';
import _ from 'lodash'
import {validateCredential} from '../services/validator';
import { inject } from '@loopback/core';
import { BcryptHasher } from  '../services/hash.password.bcrpty'
import {CreadentialRequestBody, TokenRequestBody, EmailRequestBody, ConfirmRequestBody} from '../controllers/specs/user.controller.spec';
import {MyUserService} from '../services/user.services';
import {JWTService} from '../services/jwt.service';
import { TokenServiceConstant, TokenServiceBinding, HashServiceBinding, UserServiceBinding } from '../key';
import { createHmac } from 'crypto';

export class UserController {
  constructor(    
      @repository(UserRepository)
      public userRepository:UserRepository,
      @inject(HashServiceBinding.PASSWORD_HASHER)
      public hasher : BcryptHasher,
      @inject(UserServiceBinding.USER_SERVICE)
      public userService : MyUserService,
      @inject(TokenServiceBinding.TOKEN_AUTH_SECRET)
      public tokenService : JWTService
  ) {}

  //SignUp
  @post("/user/signUp",{
    responses:{
      '200':{
        decription:'User',
        content:{
          schema:getJsonSchema(UserRepository)
        }
      }
    }
  })
  async signUp(@requestBody() userdata : User){
    validateCredential(_.pick(userdata,["email",'password']));
    userdata.password = await this.hasher.hashPassword(userdata.password);
    let savedUser;
    try{
      savedUser = await this.userRepository.create(userdata);
    }catch(err){
      throw new HttpErrors.BadRequest(`Issue While creating ${err}`);
    }
    delete savedUser.password;
    let tosendobj = {
      "msg": "Sucess",
      "userdata": savedUser
    }
    return tosendobj;
  }

  //Login
  @post("/user/login", {
    responses:{
      '200':{
        decription:'token',
        content:{
          "application/json":{
            schema:{
              type:"object",
              properties:{
                token:{
                  "type":"string"
                },
              }
            }
          }
        }
      }
    }
  })
  async login(@requestBody(CreadentialRequestBody) credentials : Credentials):Promise<{token:string}>{
    console.log(credentials.email);
    let validatedCred = await this.userService.verifyCredentials(credentials);
    let userProfile = await this.userService.convertToUserProfile(validatedCred);
    var token = await this.tokenService.generateToken(userProfile, TokenServiceConstant.TOKEN_EXPRIRATION_TIME);
    return {token};
  }

  //verify-Token-whoAmI
  @post('/user/whoami', {
    responses: {
      '200': {
        description: 'Meta User based on token!!',
        content: {
          'application/json': {
            schema:{
              type:"object",
              properties:{
                message:{
                  "type":"string"
                },
                email:{
                  "type":"string"
                },
              }
            }
          }
        },
      },
    },
  })
  async whoami(@requestBody(TokenRequestBody) token:TokenObject){
    let data = await this.userService.verifyUserToken(token);
    console.log("Contoller", data);
    return {
      message: "User data will be shared!",
      email: data.email
    }
  }

  //request-password-reset
  @post('/user/request-password-reset', {
    responses: {
      '200': {
        description: 'Reset password for User!!',
        content: {
          'application/json': {
            schema:{
              type:"object",
              properties:{
                message:{
                  "type":"string"
                },
              }
            }
          }
        },
      },
    },
  })
  async requestPasswordReset(@requestBody(EmailRequestBody) emailObj:EmailObject){
    let strEmail : string = emailObj.email;
    var send = await this.userService.checkForEmailExitAndMail(strEmail);
    if(!send){
      throw new HttpErrors.NotFound("Email not sent!");
    }
    return {
      message: "mail is sucessfully send!"
    }
  }

  //confirm-password-reset
  @post('/user/confirm-password-reset', {
    responses: {
      '200': {
        description: 'Comfirm password reset',
        content: {
          'application/json': {
            schema:{
              type:"object",
              properties:{
                token:{
                  "type":"string"
                },
              }
            }
          }
        },
      },
    },
  })
  async confirmPasswordReset(@requestBody(ConfirmRequestBody) emailObj:ResetEmailObj){
    let {
      token,email,password,confirmPassword
    } = emailObj;
    if(password!=confirmPassword){
      throw new HttpErrors.NotAcceptable("Value of password are not equal!");
    }

    let metadata = await this.userService.verifyUserToken({token});
    if(metadata.email!=email){
      throw new HttpErrors.NotAcceptable(`Email "${email}" not Found!`);
    }

    let tokenGen = await this.userService.updateUserPassword(password, email);
    if(!tokenGen){
      throw new HttpErrors.NotAcceptable("Token generation issue!");
    }
    return {
      token: tokenGen
    }
  }

}
