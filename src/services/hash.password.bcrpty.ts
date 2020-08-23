import {genSalt, hash , compare} from 'bcryptjs'
import {inject} from '@loopback/core';
import { HASHServiceConstant } from '../key';
interface PasswordHasher<T = string>{
    hashPassword(T : string): Promise<T>;
    comparePassword(passwordFromRequest:T, storedPassword:T): Promise<boolean>;
}

export class BcryptHasher implements PasswordHasher<string>{
    @inject(HASHServiceConstant.PASSWORD_HASHER_ROUND)
    public readonly round : number;
    async hashPassword(password:string){
        const salt = await genSalt(this.round);
        return await hash(password, salt);
    }
    async comparePassword(passwordFromRequest:string,storedPassword: string): Promise<boolean> {
        let compared = await compare(passwordFromRequest, storedPassword);
        return compared;
    }
}