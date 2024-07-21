const testRepository = require('./repository');
const furDataRepository = require('../furdata/repository')

exports.createTest = async (req, res) => {
    try {
        const newTest = await testRepository.createTest();
        res.status(200).send({ result: 'success', message: 'Test 생성에 성공했습니다.'});
    } catch (err) {
        console.error('Error during test creation:', err);
        res.status(500).send({ result: 'fail', message: 'Test 생성에 실패했습니다.' });
    }
};

// 검사 정보 조회
exports.getTest = async (req, res) => {
  const { testId } = req.params;

  try {
    const test = await testRepository.findTestById(testId);
    if (test) {
      res
        .status(200)
        .send({
          result: 'success',
          message: '검사 정보 조회 성공',
          data: test,
        });
    } else {
      res
        .status(404)
        .send({ result: 'fail', message: '검사 정보를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('Error during test retrieval:', error);
    res
      .status(500)
      .send({ result: 'fail', message: '검사 정보 조회에 실패했습니다.' });
  }
};


// 검사 정보 삭제
exports.deleteTest = async (req, res) => {
  const { testId } = req.params;

  try {
    const deleted = await testRepository.deleteTest(testId);
    if (deleted) {
      res
        .status(200)
        .send({ result: 'success', message: '검사 정보가 삭제되었습니다.' });
    } else {
      res
        .status(400)
        .send({ result: 'fail', message: '검사 정보 삭제에 실패하였습니다.' });
    }
  } catch (error) {
    console.error('Error during test deletion:', error);
    res
      .status(500)
      .send({ result: 'fail', message: '검사 정보 삭제에 실패했습니다.' });
  }
}

// 검사 전체 리스트 조회
exports.getTestList = async (req, res) => {
    try {
        const testList = await testRepository.findAllTests();

        res.status(200).send({
          result: 'success',
          message: '전체 검사 리스트 조회가 성공되었습니다.',
          data: {
            data: testList,
          },
        });
    } catch (error) {
        console.error('Error during test list retrieval:', error);
        res
          .status(500)
          .send({ result: 'fail', message: '전체 검사 리스트 조회에 실패했습니다.' });
    }
}

