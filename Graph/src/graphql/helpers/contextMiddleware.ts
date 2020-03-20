import { Context } from '../types';

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
    return {
        authorization: req.headers.authorization,
        requestId: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
    };
};
