import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swagger from '../configs/swagger.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const __swaggerDistPath = path.join(
    __dirname,
    "node_modules",
    "swagger-ui-dist"
);

const apiDocumentation = (app) => {
    app.use('/api/docs',
        express.static(__swaggerDistPath, { index: false }),
        swaggerUi.serve,
        swaggerUi.setup(swagger)
    );
};

export default apiDocumentation