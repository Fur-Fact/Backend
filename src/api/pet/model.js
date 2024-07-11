const { DataTypes } = require('sequelize');
const sequelize = require('../../data/sequelize');
const User = require('../user/model');

const Pet = sequelize.define("Pet", {
    id: {
        field: "id",
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        field: "user_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // User 모델 테이블 이름
            key: 'id'
        }
    },
    name: {
        field: "name",
        type: DataTypes.STRING(10),
        allowNull: false
    },
    age: {
        field: "age",
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        field: "image",
        type: DataTypes.STRING(100),
        allowNull: true
    },
    gender: {
        field: "gender",
        type: DataTypes.ENUM('male', 'female'),
        allowNull: false
    },
    species: {
        field: "species",
        type: DataTypes.STRING(20),
        allowNull: false
    },
    weight: {
        field: "weight",
        type: DataTypes.INTEGER,
        allowNull: false
    },
    feed: {
        field: "feed",
        type: DataTypes.STRING(10),
        allowNull: true
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
    tableName: "pets"
});

module.exports = Pet;