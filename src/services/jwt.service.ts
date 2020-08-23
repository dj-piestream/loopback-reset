import { UserProfile } from '@loopback/security';
import {promisify} from 'util';
var jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);
import { HttpErrors } from '@loopback/rest';
import { TokenObject } from '../repositories';
import { TokenServiceConstant } from '../key';

export class JWTService {
    async generateToken(userProfile: UserProfile, expiresIn: string){
        if(!userProfile){
            throw new HttpErrors.NotFound(`userProfile is null!`);
        }
        let token = '';
        try{
            token = await signAsync(userProfile, TokenServiceConstant.TOKEN_SECRET_VALUE,{expiresIn: expiresIn});
        }catch(err){
            throw new HttpErrors.Unauthorized(`error generating token ${err}`);
        }
        return token;
    }
    async verifyToken(tokenObj: TokenObject): Promise<string>{
        let data = await verifyAsync(tokenObj.token,TokenServiceConstant.TOKEN_SECRET_VALUE);
        return data.email;
    }
}