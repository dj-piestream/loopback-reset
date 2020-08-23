import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    mail_Initiated?: boolean;
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export declare type UserWithRelations = User & UserRelations;
