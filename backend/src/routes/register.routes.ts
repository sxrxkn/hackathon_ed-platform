import express, { Request, Response } from "express";
import { pool } from '../db/db.js';

import { User, UserSchema } from '../types/types.js';

const registerRouter = express.Router();

async function register(req:Request, res:Response) {
  try {
    
    const signingUser: User = {
      last_name : req.body.lastName,
      first_name : req.body.firstName,
      middle_name : req.body.middleName,
      birth_date : req.body.birthDate,
      city : req.body.city,
      email : req.body.email, 
      password : req.body.password,
      is_teacher : req.body.isTeacher, 
      is_admin : req.body.isAdmin 
    };
    
    const validatedUser = UserSchema.parse(signingUser);
    const values = Object.values(validatedUser);
    
    const text = 'INSERT INTO ds.users (last_name, first_name, middle_name, birth_date, city, email, password, is_teacher, is_admin) VALUES($1, $2, $3, $4, $5, $6 , $7, $8 , $9) RETURNING *;';

    const result = await pool
      .query(text, values)
      .then((res) => {
        return res.rows[0];
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    console.log ('row status:', result);
    res.sendStatus(201);
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

registerRouter.post("/", register);

export default registerRouter;