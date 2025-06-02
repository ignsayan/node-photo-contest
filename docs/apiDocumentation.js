import swaggerUi from 'swagger-ui-express'
import swagger from '../configs/swagger.js'

const apiDocumentation = (app) => {
    app.use('/api/docs',
        swaggerUi.serve,
        swaggerUi.setup(swagger)
    );
};

export default apiDocumentation