import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '../configs/swagger.js'

const apiDocumentation = (app) => {
    app.use('/api/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec)
    );
};

export default apiDocumentation