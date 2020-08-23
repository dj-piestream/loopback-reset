"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongodsDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'mongods',
    connector: 'mongodb',
    url: '',
    host: '127.0.0.1',
    port: 27017,
    user: '',
    password: '',
    database: 'lb4-demo',
    useNewUrlParser: true
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let MongodsDataSource = class MongodsDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
MongodsDataSource.dataSourceName = 'mongods';
MongodsDataSource.defaultConfig = config;
MongodsDataSource = tslib_1.__decorate([
    core_1.lifeCycleObserver('datasource'),
    tslib_1.__param(0, core_1.inject('datasources.config.mongods', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], MongodsDataSource);
exports.MongodsDataSource = MongodsDataSource;
//# sourceMappingURL=mongods.datasource.js.map