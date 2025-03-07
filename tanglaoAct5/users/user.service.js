"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("./user.model");
async function getAllUsers() {
    return await user_model_1.User.findAll();
}
async function getUserById(id) {
    const user = await user_model_1.User.findByPk(id);
    if (!user)
        throw new Error('User not found');
    return user;
}
async function createUser(params) {
    // Check if the user already exists
    if (await user_model_1.User.findOne({ where: { email: params.email } })) {
        throw new Error(`Email ${params.email} is already registered`);
    }
    // Hash the password
    const passwordHash = await bcryptjs_1.default.hash(params.password, 10);
    // Create a new user
    const user = await user_model_1.User.create({
        email: params.email,
        passwordHash: passwordHash,
        title: params.title,
        firstName: params.firstName,
        lastName: params.lastName,
        role: params.role
    });
    console.log('User created successfully:');
}
async function updateUser(id, params) {
    const user = await getUserById(id);
    if (params.email && params.email !== user.email && (await user_model_1.User.findOne({ where: { email: params.email } }))) {
        throw new Error(`Email ${params.email} is already taken`);
    }
    if (params.password) {
        // Use 'passwordHash' instead of 'password'
        const passwordHash = await bcryptjs_1.default.hash(params.password, 10);
        Object.assign(user, { ...params, passwordHash });
    }
    else {
        Object.assign(user, params);
    }
    await user.save();
}
async function deleteUser(id) {
    const user = await getUserById(id);
    await user.destroy();
}
