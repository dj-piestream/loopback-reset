import { DefaultCrudRepository } from '@loopback/repository';
import { User, UserRelations } from '../models';
import { MongodsDataSource } from '../datasources';
export declare type Credentials = {
    email: string;
    password: string;
};
export declare type EmailObject = {
    email: string;
};
export declare type TokenObject = {
    token: string;
};
export declare type ResetEmailObj = {
    token: string;
    email: string;
    password: string;
    confirmPassword: string;
};
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.email, UserRelations> {
    constructor(dataSource: MongodsDataSource);
}
