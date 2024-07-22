const express = require("express");
const multer = require("multer");
const router = express.Router();
const logging = require("./middleware/logging");
const userController = require("./api/user/controller");
const petController = require("./api/pet/controller");
const testController = require("./api/test/controller");
const furdataController = require("./api/furdata/controller");
const verify = require("./middleware/jwtVerify");
const upload = multer({ dest: "uploads/" });
// 로깅 미들웨어 사용
router.use(logging);

//유저
router.post("/api/v1/users/signup", userController.register); //회원가입
router.post("/api/v1/users/login", userController.login); //로그인
router.get("/api/v1/users/mypage", verify, userController.mypage); //내 정보
router.get("/api/v1/users/:id", userController.getUserById); //유저별 조회

//펫
router.post("/api/v1/pets", verify, petController.registerPet); // 펫 등록
router.get('/api/v1/pets/list', verify, petController.getPetsByUserId);
router.put("/api/v1/pets/:petId", verify, petController.updatePet); // 펫 정보 수정
router.delete("/api/v1/pets/:petId", verify, petController.deletePet); // 펫 정보 삭제
router.get("/api/v1/pets/:petId", verify, petController.getPet); // 특정 펫 정보 조회


//테스트
router.post("/api/v1/tests", testController.createTest);
router.post('/api/v1/tests/comment', testController.addCommentToTest);
router.post('/api/v1/tests/push', testController.pushAlarm);
router.post("/api/v1/tests", testController.createTest); // 검사 정보 추가
router.get('/api/v1/tests',verify, testController.getTestList); // 검사 리스트 조회
router.get('/api/v1/tests/search', verify, testController.getTestByPhoneAndName);
router.get('/api/v1/tests/:testId',verify, testController.getTest); // 검사정보 조회
router.delete('/api/v1/tests/:testId',verify, testController.deleteTest); // 검사정보 삭제


//furdata
router.post(
    "/api/v1/furdatas",
    upload.single("file"),
    furdataController.createFurdata
);

module.exports = router;
