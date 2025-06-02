import express from 'express'
import swagger, { __swaggerDistPath } from '../configs/swagger.js'
import swaggerUi from 'swagger-ui-express'

const apiDocumentation = (app) => {
    app.use('/api/docs',
        express.static(__swaggerDistPath, { index: false }),
        swaggerUi.serve,
        swaggerUi.setup(swagger)
    );
};

export default apiDocumentation