import * as isEmail from 'isemail';
import {HttpErrors} from '@loopback/rest'
import {Credentials} from '../repositories/user.repository';

export function validateCredential(credentials:Credentials){
    if(!isEmail.validate(credentials.email)){
        throw new HttpErrors.UnprocessableEntity('Email is in valid!');
    }
    if(credentials.password.length<8){
        throw new HttpErrors.UnprocessableEntity('password is less than 8 Characters!');
    }
}
