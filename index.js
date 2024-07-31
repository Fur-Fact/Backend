require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin')
const cors = require('cors');
const initializeDatabase = require('./src/data/initDatabase'); // 데이터베이스 초기화 함수 가져오기

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
    'https://frontend-ten-rosy-72.vercel.app',
    'https://d15btnqgm33xtd.cloudfront.net',
    'http://localhost:5173',
    'https://frontend-m2wrstio1-bellyuns-projects.vercel.app'
];

const corsOptions = {
    origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
    },
    credentials: true,  // 자격 증명을 포함하도록 설정
};
app.use(cors(corsOptions)); // CORS 미들웨어 설정



// Firebase Admin SDK 초기화
let serviceAccount = require('./fur-fact-firebase-adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

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