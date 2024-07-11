const petRepository = require('./repository');

exports.registerPet = async (req, res) => {
    const user = req.user;
    console.log(user);
    const { name, age, image, gender, species, weight, feed } = req.body;
    
    // 입력 데이터 검증
    if (!user || !name || !age || !gender || !species || !weight) {
        return res.status(400).send({
            result: 'fail',
            message: '필수 필드를 모두 입력해야 합니다.',
        });
    }

    try {
        const newPet = await petRepository.createPet({
            userId: user.id,
            name,
            age,
            image,
            gender,
            species,
            weight,
            feed,
        });

        res.send({ status: 200, message: 'success'});
    } catch (err) {
        console.error('Error during pet registration:', err);
        res.send({ result: 'fail', message: '펫 등록에 실패했습니다.' });
    }
};