"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    database: {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "3306"),
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "Ashleykyle27",
        database: process.env.DB_NAME || "node-mysql-crud-api"
    }
};
exports.default = config;
