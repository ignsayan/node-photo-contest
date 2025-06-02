import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'

const docPath = path.resolve('./docs');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: `${process.env.APP_NAME}`,
            version: '1.0.0',
            description: 'API Documentation V1',
        },
        servers: [
            {
                url: `${process.env.APP_HOST}`,
            },
        ],
    },
    apis: [
        path.join(docPath, 'authDoc.js'),
        path.join(docPath, 'adminDoc.js'),
        path.join(docPath, 'userDoc.js'),
    ],
};

const swagger = swaggerJSDoc(options);

export default swagger
