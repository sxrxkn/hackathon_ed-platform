import express from 'express';
import registerRouter from './register.routes.js';
import loginRouter from './login.routes.js';
import { auth } from '../middleware/auth.js';

import coursesRouter from "./courses.routes.js";
import quizRouter from "./quiz.routes.js";

const router = express.Router();

router.use("/api/register", registerRouter)
router.use("/api/login", loginRouter)

router.use("/api/courses", auth, coursesRouter);
router.use("/api/quiz", auth, quizRouter);

router.get('/api/token', auth, (_req, res) => {
  res.sendStatus(200);
});


export default router;