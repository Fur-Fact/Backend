const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const petSwaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger-pet.yaml'));
const userSwaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger-user.yaml'));

// 병합된 Swagger 문서 생성
const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation for multiple domains'
    },
    paths: {
        ...petSwaggerDocument.paths,
        ...userSwaggerDocument.paths
    },
    components: {
        schemas: {
            ...petSwaggerDocument.components.schemas,
            ...userSwaggerDocument.components.schemas
        },
        securitySchemes: {
            ...petSwaggerDocument.components.securitySchemes,
            ...userSwaggerDocument.components.securitySchemes
        }
    }
};

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};