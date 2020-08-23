import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models';
import {MongodsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export type Credentials = {
  email:string;
  password:string;
}

export type EmailObject = {
  email:string;
}

export type TokenObject = {
  token:string;
}

export type ResetEmailObj = {
  token:string;
  email:string;
  password:string;
  confirmPassword:string;
}


export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.email,
  UserRelations
> {
  constructor(
    @inject('datasources.mongods') dataSource: MongodsDataSource,
  ) {
    super(User, dataSource);
  }
}
