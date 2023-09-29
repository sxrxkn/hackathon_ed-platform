import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { pool } from '../db/db.js';

export const SECRET_KEY: Secret = 'your-secret-key-here';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //console.log(req); //redundant option, uncomment only while hard debugging
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      console.log('token is empty');
      throw new Error('token is empty');
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    (req as CustomRequest).token = decoded;

    const textSelect = 'SELECT email, password FROM ds.users WHERE email = $1';
    const valuesSelect = [(decoded as JwtPayload).email];
    const userData = await pool
      .query(textSelect, valuesSelect)
      .then((res:any) => {
        return res.rows[0];
      })
      .catch((e:any) => {
        throw new Error(e.message);
      });

    if (!userData) {
      throw new Error('user was not found');
    }
    if (!userData.password) {
      throw new Error('user password problem');
    }

    console.log('token is valid');

    next();
  } catch (err: unknown) {
    if (err instanceof jwt.JsonWebTokenError) {
        console.log(`error name: ${err.name}, error message: ${err.message}`);
      res.status(401).send({ error: err.message });
    } else if (err instanceof jwt.TokenExpiredError) {
        console.log(`error name: ${err.name}, error message: ${err.message}`);
      res.status(401).send({ error: err.message });
    } else {
        if (err instanceof Error) {
            // TypeScript knows err is Error
            res.status(401).send({ error: err.message });
          } else {
            // Unexpected error
            res.status(401).send({ error: 'unexpected error' });
          }
    }
  }
};
