import { Context } from '../types';
import { getUserFromToken } from './getUserFromToken';

interface ContextHeaders extends Headers {
    authorization: string;
}

interface ContextRequest extends Request {
    headers: ContextHeaders;
}

export const contextMiddleware = ({
    req
}: {
    req: ContextRequest;
}) => {

    const user = getUserFromToken(req.headers.authorization);
    return {
        user,
        authorization: req.headers.authorization,
        requestId: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
    };
};
