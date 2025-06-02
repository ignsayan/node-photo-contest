import swaggerJSDoc from 'swagger-jsdoc'

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
        './docs/authDoc.js',
        './docs/adminDoc.js',
        './docs/userDoc.js',
    ],
};

const swagger = swaggerJSDoc(options);

export default swagger
