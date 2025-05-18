const handler = (fn) => {
    return async (req, res) => {
        try {
            const result = await fn(req, res);

            const isValid = result &&
                typeof result === 'object' &&
                typeof result.status === 'number' &&
                typeof result.message === 'string' &&
                result.data !== undefined;

            if (!isValid) {
                throw {
                    status: 500,
                    message: 'Controller did not return a valid response format (status, message, data)'
                };
            }
            return res.status(result.status).json({
                message: result.message,
                data: result.data
            });


        } catch (error) {
            const status = error.status || 500;
            const message = error.message || 'Something went wrong';

            return res.status(status).json({
                errors: {
                    general: [message]
                }
            });
        }
    };
};

export default handler;
