const petRepository = require('./repository');
const { uploadImage } = require('../../middleware/s3Upload');

exports.registerPet = [
    uploadImage.single('image'),
    async (req, res) => {
        const user = req.user;
        const { name, age, gender, species, weight, feed } = req.body;

        // 입력 데이터 검증
        if (!user || !name || !age || !gender || !species || !weight) {
            return res.status(400).send({
                result: 'fail',
                message: '필수 필드를 모두 입력해야 합니다.',
            });
        }

        try {
            const image = req.file ? req.file.location : null
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

            res.status(200).send({ result: 'success', message: '펫 등록에 성공했습니다.' });
        } catch (err) {
            console.error('Error during pet registration:', err);
            res.status(500).send({ result: 'fail', message: '펫 등록에 실패했습니다.' });
        }
    }
];