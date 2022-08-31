import { Request, Response, NextFunction } from 'express';

function errorHandler(err, _req: Request, res: Response, _next: NextFunction) {
    if (err.type === 'error_unauthorized') {
        return res.status(401).send(err.message);
    }

    if (err.type === 'error_forbidden') {
        return res.status(403).send(err.message);
    }

    if (err.type === 'error_not_found') {
        return res.status(404).send(err.message);
    }

    if (err.type === 'error_conflict') {
        return res.status(409).send(err.message);
    }

    if (err.type === 'error_unprocessable_entity') {
        return res.status(422).send(err.message);
    }

    console.log(err)
    return res.status(500).send(err);
}

export default errorHandler;
