"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let BookController = class BookController {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async create(book) {
        return this.bookRepository.create(book);
    }
    async count(where) {
        return this.bookRepository.count(where);
    }
    async find(filter) {
        return this.bookRepository.find(filter);
    }
    async updateAll(book, where) {
        return this.bookRepository.updateAll(book, where);
    }
    async findById(id, filter) {
        return this.bookRepository.findById(id, filter);
    }
    async updateById(id, book) {
        await this.bookRepository.updateById(id, book);
    }
    async replaceById(id, book) {
        await this.bookRepository.replaceById(id, book);
    }
    async deleteById(id) {
        await this.bookRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/books', {
        responses: {
            '200': {
                description: 'Book model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Book) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Book, {
                    title: 'NewBook',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Book]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/books/count', {
        responses: {
            '200': {
                description: 'Book model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Book)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/books', {
        responses: {
            '200': {
                description: 'Array of Book model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Book, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Book)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/books', {
        responses: {
            '200': {
                description: 'Book PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Book, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Book)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Book, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/books/{id}', {
        responses: {
            '200': {
                description: 'Book model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Book, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Book, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/books/{id}', {
        responses: {
            '204': {
                description: 'Book PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Book, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Book]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/books/{id}', {
        responses: {
            '204': {
                description: 'Book PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Book]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/books/{id}', {
        responses: {
            '204': {
                description: 'Book DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], BookController.prototype, "deleteById", null);
BookController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.BookRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BookRepository])
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map