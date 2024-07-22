const testRepository = require('./repository');
const admin = require('firebase-admin');

exports.createTest = async (req, res) => {
  try {
    const newTest = await testRepository.createTest();
    res
      .status(200)
      .send({ result: 'success', message: 'Test 생성에 성공했습니다.' });
  } catch (err) {
    console.error('Error during test creation:', err);
    res
      .status(500)
      .send({ result: 'fail', message: 'Test 생성에 실패했습니다.' });
  }
};

exports.addCommentToTest = async (req, res) => {
  const { test_id, comment } = req.body;

  if (!test_id || !comment) {
    return res.status(400).send({
      result: 'fail',
      message: 'test_id와 comment는 필수 항목입니다.',
    });
  }

  try {
    await testRepository.addCommentToTest(test_id, comment);
    res
      .status(200)
      .send({ result: 'success', message: '코멘트 추가 성공했습니다.' });
  } catch (err) {
    console.error('Error during comment addition:', err);
    res
      .status(500)
      .send({ result: 'fail', message: '코멘트 추가에 실패했습니다.' });
  }
};

exports.pushAlarm = async (req, res) => {
  const { token } = req.body;

  const userToken = token;

  let message = {
    notification: {
      title: '테스트',
      body: '테스트',
    },
    token: userToken,
  };

  admin
    .messaging()
    .send(message)
    .then(function (response) {
      console.log('Successfully sent message:', response);
      return res.status(200).json({ success: true });
    })
    .catch(function (err) {
      console.log('Error Sending message:', err);
      return res.status(400).json({ success: false });
    });
};

// 검사 정보 조회
exports.getTest = async (req, res) => {
  const { testId } = req.params;

  try {
    const test = await testRepository.findTestById(testId);
    if (test) {
      res.status(200).send({
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
};

// 전체 테스트 리스트 조회 (페이지 네이션 추가)
exports.getTestList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const testList = await testRepository.getTestList({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });

    res.status(200).send({
      result: 'success',
      message: '전체 검사 리스트 조회가 성공되었습니다.',
      data: testList,
    });
  } catch (error) {
    console.error('Error during test list retrieval:', error);
    res.status(500).send({
      result: 'fail',
      message: '전체 검사 리스트 조회에 실패했습니다.',
    });
  }
};
