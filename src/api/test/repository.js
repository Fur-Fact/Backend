const Test = require('../test/model');

exports.createTest = async () => {
    try {
        const newTest = await Test.create();
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