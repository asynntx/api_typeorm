"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_handler_1 = __importDefault(require("./_middleware/error-handler"));
const users_controller_1 = __importDefault(require("./users/users.controller"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// API routes
app.use('/users', users_controller_1.default);
// 🔥 Correct way to register error-handling middleware
app.use((err, req, res, next) => {
    (0, error_handler_1.default)(err, req, res, next);
});
// Start server
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
exports.default = app;
