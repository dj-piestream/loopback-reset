"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Book = class Book extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        id: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Book.prototype, "isbn", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Book.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Book.prototype, "author", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Book.prototype, "grnre", void 0);
Book = tslib_1.__decorate([
    repository_1.model({ settings: { strict: true } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Book);
exports.Book = Book;
//# sourceMappingURL=book.model.js.map