const jwt = require("jsonwebtoken");

/**
 * JWT 토큰 검증 미들웨어
 * 토큰 검증에 실패하면 에러메시지 출력
 */
module.exports = async (req, res, next) => {
  const authHeader = req.get("authorization");
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '인증되지 않은 사용자' });
  }

  jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).send(err);
    }
    req.user = decoded;
    next();
  });
};
