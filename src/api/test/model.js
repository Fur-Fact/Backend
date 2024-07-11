const { DataTypes } = require('sequelize');
const sequelize = require('../../data/sequelize');
const Pet = require('../pet/model');

const Test = sequelize.define('Test', {
    id: {
        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    petId: {
        field: "pet_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pet,
            key: 'id'
        }
    },
    comment: {
        field: 'comment',
        type: DataTypes.STRING(1024),
        allowNull: true,
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    isDeleted: {
        field: 'is_deleted',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    underscored: true,
    freezeTableName: true,
    tableName: 'test',
});

module.exports = Test;