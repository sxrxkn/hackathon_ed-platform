import express from 'express';
import { pool } from '../db/db.js';
import jsonwebtoken from 'jsonwebtoken';
import { SECRET_KEY } from '../middleware/auth.js';

const loginRouter = express.Router();

async function login(req:any, res:any) {
   
  try {
    const textSelect = 'SELECT email, password FROM ds.users WHERE email = $1';
    const valuesSelect = [req.body.email];
    const userData = await pool
      .query(textSelect, valuesSelect)
      .then((res) => {
        return res.rows[0];
      })
      .catch((e) => {
        throw new Error(e.message);
      });

    if (!userData) {
      throw new Error('user was not found');
    }
    if (!userData.password) {
      throw new Error('user password problem');
    }
    if (userData.password !== req.body.password) {
      throw new Error('user password problem');
    }

      
    let token = jsonwebtoken.sign({ email: userData.email }, SECRET_KEY, {
      expiresIn: 60 * 60,
    });

 
    res.status(200).send({ login: userData.email, token: token });  
   

  } catch (error: unknown) {
    if (error instanceof Error) {
      // TypeScript knows err is Error
      res.status(400).send({ error: error.message });
      } else {
      // Unexpected error
      res.status(400).send({ error: 'unexpected error' });
    }
  }
}

loginRouter.post("/", login);

export default loginRouter;