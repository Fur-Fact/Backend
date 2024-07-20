const testRepository = require('./repository');
const admin = require('firebase-admin');

exports.createTest = async (req, res) => {
    try {
        const newTest = await testRepository.createTest();
        res.status(200).send({ result: 'success', message: 'Test 생성에 성공했습니다.' });
    } catch (err) {
        console.error('Error during test creation:', err);
        res.status(500).send({ result: 'fail', message: 'Test 생성에 실패했습니다.' });
    }
};

exports.addCommentToTest = async (req, res) => {
    const { test_id, comment } = req.body;

    if (!test_id || !comment) {
        return res.status(400).send({ result: 'fail', message: 'test_id와 comment는 필수 항목입니다.' });
    }

    try {
        await testRepository.addCommentToTest(test_id, comment);
        res.status(200).send({ result: 'success', message: '코멘트 추가 성공했습니다.' });
    } catch (err) {
        console.error('Error during comment addition:', err);
        res.status(500).send({ result: 'fail', message: '코멘트 추가에 실패했습니다.' });
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