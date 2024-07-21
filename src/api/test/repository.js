const Test = require('../test/model');
const Pet = require('../pet/model');

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

// 검사 결과 조회
exports.findTestById = async (id) => {
  try {
    const test = await Test.findByPk(id);
    return test;
  } catch (error) {
    throw error;
  }
};

// 검사 결과 삭제
exports.deleteTest = async (id) => {
  try {
    const result = await Test.destroy({ where: { id: id } });
    return result;
  } catch (error) {
    throw error;
  }
};

// 전체 테스트 리스트 조회 함수 추가
exports.findAllTests = async () => {
    try {
        const tests = await Test.findAll();
        return tests;
    } catch (error) {
        throw error;
    }
};