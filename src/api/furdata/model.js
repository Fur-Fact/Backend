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
    name: {
        field: "name",
        type: DataTypes.STRING(15),
        allowNull: false
    },
    Ca: { field: 'Ca', type: DataTypes.FLOAT, allowNull: true },
    Mg: { field: 'Mg', type: DataTypes.FLOAT, allowNull: true },
    Na: { field: 'Na', type: DataTypes.FLOAT, allowNull: true },
    K: { field: 'K', type: DataTypes.FLOAT, allowNull: true },
    P: { field: 'P', type: DataTypes.FLOAT, allowNull: true },
    Zn: { field: 'Zn', type: DataTypes.FLOAT, allowNull: true },
    Cu: { field: 'Cu', type: DataTypes.FLOAT, allowNull: true },
    Se: { field: 'Se', type: DataTypes.FLOAT, allowNull: true },
    Fe: { field: 'Fe', type: DataTypes.FLOAT, allowNull: true },
    Cr: { field: 'Cr', type: DataTypes.FLOAT, allowNull: true },
    V: { field: 'V', type: DataTypes.FLOAT, allowNull: true },
    Mn: { field: 'Mn', type: DataTypes.FLOAT, allowNull: true },
    Mo: { field: 'Mo', type: DataTypes.FLOAT, allowNull: true },
    Co: { field: 'Co', type: DataTypes.FLOAT, allowNull: true },
    S: { field: 'S', type: DataTypes.FLOAT, allowNull: true },
    B: { field: 'B', type: DataTypes.FLOAT, allowNull: true },
    Li: { field: 'Li', type: DataTypes.FLOAT, allowNull: true },
    Sr: { field: 'Sr', type: DataTypes.FLOAT, allowNull: true },
    Hg: { field: 'Hg', type: DataTypes.FLOAT, allowNull: true },
    Pb: { field: 'Pb', type: DataTypes.FLOAT, allowNull: true },
    Al: { field: 'Al', type: DataTypes.FLOAT, allowNull: true },
    Cd: { field: 'Cd', type: DataTypes.FLOAT, allowNull: true },
    As: { field: 'As', type: DataTypes.FLOAT, allowNull: true },
    Ba: { field: 'Ba', type: DataTypes.FLOAT, allowNull: true },
    Sb: { field: 'Sb', type: DataTypes.FLOAT, allowNull: true },
    Bi: { field: 'Bi', type: DataTypes.FLOAT, allowNull: true },
    Ti: { field: 'Ti', type: DataTypes.FLOAT, allowNull: true },
    U: { field: 'U', type: DataTypes.FLOAT, allowNull: true },
    Cs: { field: 'Cs', type: DataTypes.FLOAT, allowNull: true },
}, {
    underscored: true,
    freezeTableName: true,
    tableName: 'furdata',
});

module.exports = FurData;