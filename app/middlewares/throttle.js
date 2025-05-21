const rateLimiter = new Map();

const throttle = (requests = 60, timeframe = 60) => {
    return (req, res, next) => {
        const key = req.ip;
        const now = Date.now();

        if (!rateLimiter.has(key)) {
            rateLimiter.set(key, []);
        }

        const timestamps = rateLimiter.get(key);

        const validTime = now - timeframe * 1000;
        while (timestamps.length && timestamps[0] < validTime) {
            timestamps.shift();
        }

        if (timestamps.length >= requests) {
            return res.status(429).json({
                errors: 'Too many requests. Please try again later.'
            });
        }

        timestamps.push(now);
        next();
    };
};

export default throttle;
