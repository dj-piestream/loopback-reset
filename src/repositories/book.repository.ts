import {DefaultCrudRepository} from '@loopback/repository';
import {Book, BookRelations} from '../models';
import {MongodsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BookRepository extends DefaultCrudRepository<
  Book,
  typeof Book.prototype.isbn,
  BookRelations
> {
  constructor(
    @inject('datasources.mongods') dataSource: MongodsDataSource,
  ) {
    super(Book, dataSource);
  }
}
