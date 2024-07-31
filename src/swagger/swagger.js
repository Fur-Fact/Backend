const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const petSwaggerDocument = YAML.load(path.join(__dirname, '../swagger/swagger-pet.yaml'));
const userSwaggerDocument = YAML.load(path.join(__dirname, '../swagger/swagger-user.yaml'));
const furDataSwaggerDocument = YAML.load(path.join(__dirname, '../swagger/swagger-furData.yaml'));
const testSwaggerDocument = YAML.load(path.join(__dirname, '../swagger/swagger-test.yaml')); // 추가된 부분

// 병합된 Swagger 문서 생성
const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Fur-Fact',
        version: '1.0.0',
        description: '펫 모발을 통한 데이터 분석 및 사료 추천 서비스'
    },
    paths: {
        ...petSwaggerDocument.paths,
        ...userSwaggerDocument.paths,
        ...furDataSwaggerDocument.paths,
        ...testSwaggerDocument.paths // 추가된 부분
    },
    components: {
        schemas: {
            ...petSwaggerDocument.components.schemas,
            ...userSwaggerDocument.components.schemas,
            ...furDataSwaggerDocument.components.schemas,
            ...testSwaggerDocument.components.schemas // 추가된 부분
        },
        securitySchemes: {
            ...petSwaggerDocument.components.securitySchemes,
            ...userSwaggerDocument.components.securitySchemes,
            ...furDataSwaggerDocument.components.securitySchemes,
            ...testSwaggerDocument.components.securitySchemes // 추가된 부분
        }
    }
};

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};