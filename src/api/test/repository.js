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

// Test 코멘트를 업데이트하는 함수
exports.addCommentToTest = async (testId, comment) => {
    try {
        const test = await Test.findByPk(testId);
        if (!test) {
            throw new Error('Test not found');
        }

        test.comment = comment;
        await test.save();

        return test;
    } catch (err) {
        console.error('Error during comment update:', err);
        throw err;
    }
};