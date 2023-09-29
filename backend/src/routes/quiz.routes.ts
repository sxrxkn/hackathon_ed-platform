import express, { Request, Response } from "express";
import QuizService from "../services/quiz.service.js";

const router = express.Router();
const quizService = new QuizService();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const test_id = parseInt(req.params.id);
    const quiz = await quizService.getQuizQuestions(test_id);

    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ message: `Test with id ${test_id} not found` });
    }
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:id", async (req: Request, res: Response) => {
  try {
    const userAnswers = await req.body;

    const test_id = parseInt(req.params.id);
    const checkedQuiz = await quizService.checkQuiz(test_id, userAnswers);

    if (checkedQuiz) {
      console.log(checkedQuiz)
      res.json(checkedQuiz)
    } else {
      res.status(404).json({ message: `Test with id ${test_id} not found` });
    }
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
