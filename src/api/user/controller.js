const userRepository = require('./repository');
const User = require('./model');
const crypto = require("crypto");
const jwt = require('./jwt');

exports.getUserById = async (req, res) => {
    try {
        const user = await userRepository.findUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
    const { name, email, password, phone} = req.body;

    try {
        // 이메일 중복 확인
        const existingUser = await userRepository.findUserByEmail(email);

        if (existingUser) {
            return res.send({
                result: "fail",
                message: "중복된 이메일이 존재합니다.",
            });
        }

        // 비밀번호 해시화
        const hashedPassword = crypto.pbkdf2Sync(
            password,
            process.env.SALT_KEY,
            50,
            100,
            'sha512'
        ).toString('base64');

        // 사용자 등록
        const newUser = await userRepository.createUser({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        res.send({ code: 200, message: '회원가입이 완료되었습니다.' });
    } catch (err) {
        console.error('Error during user registration:', err);
        res.send({ code: 400, message: '회원가입에 실패하였습니다.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userRepository.findUserByEmailAndPassword(email, password);

        if (!user) {
            return res.send({ result: 'fail', message: '이메일 또는 비밀번호가 잘못되었습니다.' });
        }

        const token = await jwt.jwtSign(
            { id: user.id, name: user.name },
            process.env.JWT_KEY,
            { expiresIn: '1h' } // 토큰 만료 시간 설정
        );

        res.send({
            message: '로그인 성공',
            access_token: token
        });
    } catch (err) {
        console.error('Error during user login:', err);
        res.send({ result: 'fail', message: '로그인에 실패했습니다.' });
    }
};

exports.mypage = async (req, res) => {
    const user = req.user;
    console.log(user);
    const item = await userRepository.findUserById(user.id);

    if (item == null) {
        res.send({ result: "fail" });
    } else {
        res.send(item);
    }
};