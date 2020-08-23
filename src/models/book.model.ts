import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Book extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  isbn?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  author: string;

  @property({
    type: 'string',
  })
  grnre?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;
