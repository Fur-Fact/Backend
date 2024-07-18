const testRepository = require('./repository');

exports.createTest = async (req, res) => {
    try {
        const newTest = await testRepository.createTest();
        res.status(200).send({ result: 'success', message: 'Test 생성에 성공했습니다.', data: newTest });
    } catch (err) {
        console.error('Error during test creation:', err);
        res.status(500).send({ result: 'fail', message: 'Test 생성에 실패했습니다.' });
    }
};