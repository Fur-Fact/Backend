const jwt = require("jsonwebtoken");

/**
 * jwt 토큰 생성 함수
 * @param {object} payload 로그인 정보에 추가할 데이터들
 * @returns
 */
exports.jwtSign = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_KEY, {expiresIn: "1h" } ,function (err, token) {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};
