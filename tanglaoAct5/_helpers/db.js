"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const promise_1 = __importDefault(require("mysql2/promise"));
const sequelize_1 = require("sequelize");
const user_model_1 = require("../users/user.model");
const db = {};
exports.default = db;
async function initialize() {
    const { host, port, user, password, database } = config_1.default.database;
    const connection = await promise_1.default.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();
    const sequelize = new sequelize_1.Sequelize(database, user, password, { dialect: 'mysql' });
    db.sequelize = sequelize;
    db.User = (0, user_model_1.initUserModel)(sequelize);
    await sequelize.sync({ alter: true });
    console.log('Database initialized successfully');
}
initialize().catch((err) => console.error('Database initialization failed:', err));
