import { UserProfile } from '@loopback/security';
import { TokenObject } from '../repositories';
export declare class JWTService {
    generateToken(userProfile: UserProfile, expiresIn: string): Promise<string>;
    verifyToken(tokenObj: TokenObject): Promise<string>;
}
