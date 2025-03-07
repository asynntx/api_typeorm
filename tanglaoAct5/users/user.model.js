"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.initUserModel = initUserModel;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
function initUserModel(sequelize) {
    User.init({
        email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
        passwordHash: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        firstName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        lastName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        role: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    }, {
        sequelize,
        modelName: 'User',
        defaultScope: {
            attributes: { exclude: ['passwordHash'] },
        },
        scopes: {
            withHash: {
                attributes: { include: ['passwordHash'] },
            },
        },
    });
    return User;
}
