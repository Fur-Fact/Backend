const Test = require('../test/model');

exports.createTest = async (data) => {
    try {
        const newTest = await Test.create(data);
        return newTest;
    } catch (error) {
        throw error;
    }
};

exports.findTestById = async (id) => {
    try {
        const test = await Test.findByPk(id);
        return test;
    } catch (error) {
        throw error;
    }
}