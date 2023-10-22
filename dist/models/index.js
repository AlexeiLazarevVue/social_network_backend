"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const common_1 = require("@nestjs/common");
exports.db = new sequelize_1.Sequelize("db.sqlite3");
exports.db.authenticate().then(() => {
    common_1.Logger.verbose('Database successfully connected');
}).catch(e => {
    common_1.Logger.error(`Failed to connect to database: ${e}`);
});
//# sourceMappingURL=index.js.map