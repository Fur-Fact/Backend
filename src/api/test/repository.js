const Test = require('../test/model');
const FurData = require('../furdata/model');

exports.createTest = async (data) => {
  try {
    const newTest = await Test.create(data);
    return newTest;
  } catch (error) {
    throw error;
  }
};

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
    const test = await Test.findByPk(id, {
      include: {
        model: FurData,
        as: 'FurData',
      },
    });
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
exports.getTestList = async ({ page, limit }) => {
  try {
    const offset = (page - 1) * limit;

    const result = await Test.findAndCountAll({
      attributes: [
        'id',
        'petName',
        'age',
        'gender',
        'species',
        'weight',
        'resultDate',
        'hereditary_disease',
        'status',
      ],
      offset: offset,
      limit: limit,
      order: [['resultDate', 'DESC']],
    });

    return {
      totalItems: result.count,
      totalPages: Math.ceil(result.count / limit),
      currentPage: page,
      data: result.rows,
    };
  } catch (error) {
    throw error;
  }
};

exports.getTestsByPhoneAndPetName = async (contactNumber, petName) => {
  try {
    const tests = await Test.findAll({
      where: {
        contact_number: contactNumber,
        pet_name: petName,
      },
    });
    return tests;
  } catch (err) {
    console.error('Error fetching pets by user name and pet name:', err);
    throw err;
  }
};
