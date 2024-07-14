require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const initializeDatabase = require('./src/data/initDatabase'); // 데이터베이스 초기화 함수 가져오기

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Swagger 설정
const setupSwagger = require('./src/swagger/swagger');
setupSwagger(app);

// 라우터 설정
const router = require('./src/router');
app.use("/", router);

// 데이터베이스 초기화 후 서버 시작
initializeDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
    console.error('Failed to initialize the database. Server not started.');
});