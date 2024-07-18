const express = require("express");
const multer = require('multer');
const router = express.Router();
const logging = require("./middleware/logging");
const userController = require("./api/user/controller");
const petController = require("./api/pet/controller");
const testController = require("./api/test/controller");
const furdataController = require("./api/furdata/controller");
const verify = require("./middleware/jwtVerify");
const upload = multer({ dest: 'uploads/' });
// 로깅 미들웨어 사용
router.use(logging);

//유저
router.post("/api/v1/users/signup", userController.register); //회원가입
router.post("/api/v1/users/login", userController.login); //로그인
router.get("/api/v1/users/mypage", verify, userController.mypage); //내 정보
router.get("/api/v1/users/:id", userController.getUserById); //유저별 조회

//펫
router.post("/api/v1/pets", verify, petController.registerPet); // 펫 등록

//테스트
router.post("/api/v1/tests", testController.createTest);

//furdata
router.post('/api/v1/furdatas', upload.single('file'), furdataController.createFurdata);


module.exports = router;