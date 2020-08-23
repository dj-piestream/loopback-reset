import { DefaultCrudRepository } from '@loopback/repository';
import { Book, BookRelations } from '../models';
import { MongodsDataSource } from '../datasources';
export declare class BookRepository extends DefaultCrudRepository<Book, typeof Book.prototype.isbn, BookRelations> {
    constructor(dataSource: MongodsDataSource);
}
