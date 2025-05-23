import jwt from 'jsonwebtoken'

const isAuthenticated = (req, res, next) => {

    const header = req.headers['authorization'];

    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ errors: 'Bearer token not found' });
    }
    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        const message = error.message || new Error('Authorization failed');
        return res.status(401).json({ errors: message });
    }
};

export default isAuthenticated
