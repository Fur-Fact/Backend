const testRepository = require('./repository');
const admin = require('firebase-admin');
const User = require("../user/model");
const Test = require("../test/model");

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
  const { test_id, token } = req.body;

  if (!test_id || !token) {
    return res.status(400).json({ success: false, message: 'test_id와 token이 필요합니다.' });
  }

  const userToken = token;

  let message = {
    notification: {
      title: '테스트',
      body: '테스트',
    },
    token: userToken,
  };

  try {
    // 알림 전송
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);

    // 상태 업데이트
    const test = await Test.findByPk(test_id);
    if (!test) {
      return res.status(404).json({ success: false, message: '해당 test_id를 찾을 수 없습니다.' });
    }

    test.status = '코멘트 완료';
    await test.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log('Error Sending message or updating status:', err);
    return res.status(500).json({ success: false, message: '알림 전송 또는 상태 업데이트에 실패했습니다.' });
  }
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


exports.getTestByPhoneAndNameWithSecurity = async (req, res) => {

  const user = req.user;
  const { petName } = req.query;

  if (!petName) {
    return res.status(400).send({
      result: 'fail',
      message: '펫 이름이 필요합니다.',
    });
  }

  const users = await User.findByPk(user.id);

  try {
    const tests = await testRepository.getTestsByPhoneAndPetName(users.phone, petName);
    if (tests.length > 0) {
      res.status(200).send({ result: 'success', tests });
    } else {
      res.status(404).send({ result: 'fail', message: '해당 조건의 펫을 찾을 수 없습니다.' });
    }
  } catch (err) {
    console.error('Error during pet retrieval by name:', err);
    res.status(500).send({ result: 'fail', message: '펫 정보 조회에 실패했습니다.' });
  }
};

exports.getTestByPhoneAndName = async (req, res) => {

  const { contactNumber, petName } = req.query;

  if (!contactNumber || !petName) {
    return res.status(400).send({
      result: 'fail',
      message: '전화번호 또는 펫 이름이 필요합니다.',
    });
  }

  try {
    const tests = await testRepository.getTestsByPhoneAndPetName(contactNumber, petName);
    if (tests.length > 0) {
      res.status(200).send({ result: 'success', tests });
    } else {
      res.status(404).send({ result: 'fail', message: '해당 조건의 펫을 찾을 수 없습니다.' });
    }
  } catch (err) {
    console.error('Error during pet retrieval by name:', err);
    res.status(500).send({ result: 'fail', message: '펫 정보 조회에 실패했습니다.' });
  }
};

exports.updateTestStatus = async (req, res) => {
  const { testId } = req.params;

  if (!testId) {
    return res.status(400).json({ success: false, message: 'test_id가 필요합니다.' });
  }

  try {
    // 상태 업데이트
    const test = await Test.findByPk(testId);
    if (!test) {
      return res.status(404).json({ success: false, message: '해당 test_id를 찾을 수 없습니다.' });
    }

    test.status = '코멘트 대기';
    await test.save();

    return res.status(200).json({ success: true, message: '상태가 코멘트 대기로 변경되었습니다.' });
  } catch (err) {
    console.log('Error updating status:', err);
    return res.status(500).json({ success: false, message: '상태 업데이트에 실패했습니다.' });
  }
};