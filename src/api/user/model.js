const { DataTypes } = require('sequelize');
const sequelize = require('../../data/sequelize');

const User = sequelize.define("User", {
    id: {
        field: "id",
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        field: "name",
        type: DataTypes.STRING(15),
        allowNull: false
    },
    phone: {
        field: "phone",
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        field: "email",
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    password: {
        field: "password",
        type: DataTypes.STRING(200),
        allowNull: false
    },
    fcmToken: {
        field: "fcm_token",
        type: DataTypes.STRING(255),  // 토큰 길이에 따라 적절히 조정 가능
        allowNull: true  // 초기에는 null 허용
    },
    createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    isDeleted: {
        field: "is_deleted",
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    underscored: true,
    freezeTableName: true,
    tableName: "user"
});

module.exports = User;