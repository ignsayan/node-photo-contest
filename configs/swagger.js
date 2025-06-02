import swaggerJSDoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: `${process.env.APP_NAME}`,
            version: '1.0.0',
            description: 'API Documentation V1',
            contact: {
                name: 'API Support',
                url: `${process.env.APP_HOST}/support`,
                email: 'support@example.com',
            },
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

const swagger = swaggerJSDoc(options, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css',
});

export default swagger
