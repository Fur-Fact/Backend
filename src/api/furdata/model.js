const { DataTypes } = require('sequelize');
const sequelize = require('../../data/sequelize');
const Test = require('../test/model');  // Test 모델 가져오기

const FurData = sequelize.define('FurData', {
    id: {
        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    testId: {
        field: 'test_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Test,
            key: 'id',
        },
    },
    Ca: { field: 'Ca', type: DataTypes.INTEGER, allowNull: true },
    Mg: { field: 'Mg', type: DataTypes.INTEGER, allowNull: true },
    Na: { field: 'Na', type: DataTypes.INTEGER, allowNull: true },
    K: { field: 'K', type: DataTypes.INTEGER, allowNull: true },
    P: { field: 'P', type: DataTypes.INTEGER, allowNull: true },
    Zn: { field: 'Zn', type: DataTypes.INTEGER, allowNull: true },
    Cu: { field: 'Cu', type: DataTypes.INTEGER, allowNull: true },
    Se: { field: 'Se', type: DataTypes.INTEGER, allowNull: true },
    Fe: { field: 'Fe', type: DataTypes.INTEGER, allowNull: true },
    Cr: { field: 'Cr', type: DataTypes.INTEGER, allowNull: true },
    V: { field: 'V', type: DataTypes.INTEGER, allowNull: true },
    Mn: { field: 'Mn', type: DataTypes.INTEGER, allowNull: true },
    Mo: { field: 'Mo', type: DataTypes.INTEGER, allowNull: true },
    Co: { field: 'Co', type: DataTypes.INTEGER, allowNull: true },
    S: { field: 'S', type: DataTypes.INTEGER, allowNull: true },
    B: { field: 'B', type: DataTypes.INTEGER, allowNull: true },
    Li: { field: 'Li', type: DataTypes.INTEGER, allowNull: true },
    Sr: { field: 'Sr', type: DataTypes.INTEGER, allowNull: true },
    Hg: { field: 'Hg', type: DataTypes.INTEGER, allowNull: true },
    Pb: { field: 'Pb', type: DataTypes.INTEGER, allowNull: true },
    Al: { field: 'Al', type: DataTypes.INTEGER, allowNull: true },
    Cd: { field: 'Cd', type: DataTypes.INTEGER, allowNull: true },
    As: { field: 'As', type: DataTypes.INTEGER, allowNull: true },
    Ba: { field: 'Ba', type: DataTypes.INTEGER, allowNull: true },
    Sb: { field: 'Sb', type: DataTypes.INTEGER, allowNull: true },
    Bi: { field: 'Bi', type: DataTypes.INTEGER, allowNull: true },
    Ti: { field: 'Ti', type: DataTypes.INTEGER, allowNull: true },
    U: { field: 'U', type: DataTypes.INTEGER, allowNull: true },
    Cs: { field: 'Cs', type: DataTypes.INTEGER, allowNull: true },
}, {
    underscored: true,
    freezeTableName: true,
    tableName: 'furdata',
});

module.exports = FurData;