import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ITokenPayload } from '../typings/jwt';

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = (decoded as ITokenPayload).user;
    next();
  });
};

export default verifyJWT;
