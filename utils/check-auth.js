import { AuthenticationError } from 'apollo-server-errors';
import jwt from 'jsonwebtoken'

/**
 * @desc    create a token for authenticated users
 */
export const checkAuth = (context) => {
    // context = { .... headers, ..}
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        // extract token from auth header
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY);
                return user;
            } catch (error) {
                throw new AuthenticationError('Invalid/expired token');
            }
        } throw new Error("Authorization header must be 'Bearer [token]");
    } throw new Error('Authorization header must be provided!');
}