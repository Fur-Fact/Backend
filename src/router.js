const express = require("express");
const router = express.Router();
const logging = require("./middleware/logging");
const userController = require("./api/user/controller");
const petController = require("./api/pet/controller");
const verify = require("./middleware/jwtVerify");

// 로깅 미들웨어 사용
router.use(logging);

//유저
router.post("/api/user/register", userController.register); //회원가입
router.post("/api/user/login", userController.login); //로그인
router.get("/api/user/mypage", verify, userController.mypage); //내 정보
router.get("/api/user/:id", userController.getUserById); //유저별 

//펫
router.post("/api/pet/register", verify, petController.registerPet); // 펫 등록

module.exports = router;