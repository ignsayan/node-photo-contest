import swagger from '../configs/swagger.js'

export default function apiDocumentation(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(swagger);
}