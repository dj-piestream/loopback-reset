import { Entity } from '@loopback/repository';
export declare class Book extends Entity {
    isbn?: number;
    name: string;
    author: string;
    grnre?: string;
    [prop: string]: any;
    constructor(data?: Partial<Book>);
}
export interface BookRelations {
}
export declare type BookWithRelations = Book & BookRelations;
