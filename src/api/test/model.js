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
    comment: {
        field: 'comment',
        type: DataTypes.STRING(1024),
        allowNull: true,
    },
    hospital: {
        field: 'hospital',
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    receivedAt: {
        field: 'received_at',
        type: DataTypes.DATE,
        allowNull: true,
    },
    resultDate: {
        field: 'result_date',
        type: DataTypes.DATE,
        allowNull: true,
    },
    guardianName: {
        field: 'guardian_name',
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    contactNumber: {
        field: 'contact_number',
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    petName: {
        field: 'pet_name',
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    species: {
        field: 'species',
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    breed: {
        field: 'breed',
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    age: {
        field: 'age',
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    gender: {
        field: 'gender',
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    weight: {
        field: 'weight',
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    hereditaryDisease: {
        field: 'hereditary_disease',
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    feedingMethod: {
        field: 'feeding_method',
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    supplements: {
        field: 'supplements',
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    medication: {
        field: 'medication',
        type: DataTypes.STRING(256),
        allowNull: true,
    },
    status: {
        field: 'status',
        type: DataTypes.ENUM('코멘트 요청', '코멘트 대기', '코멘트 완료'),
        allowNull: false,
        defaultValue: '코멘트 요청',
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
        allowNull: false,
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