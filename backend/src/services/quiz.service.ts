import { pool } from '../db/db.js';

interface QuizAnswers {
  [key: string]: string;
}

interface QuizResults {
  [key: string]: number;
}


export default class QuizService {
  async getQuizInfo(course_id: number): Promise<any[]> {
    // array of test(s) connected to course_id
    const textSelect = 'SELECT * FROM ds.tests as t WHERE t.course_id = $1'
    const valuesSelect = [course_id];
    const quizData = await pool.query(textSelect, valuesSelect)
    .catch((e) => {
      throw new Error(e.message);
    });
    const quizInfoArr = quizData.rows
    return quizInfoArr;
  }
  
  async getQuizQuestions(test_id: number, variant?: "Qs" | "As" ): Promise<any[] | QuizAnswers | undefined> {
    // Qs - questions -- As - with answers
    // array of questions by test_id
    
    const textSelect = 'SELECT * FROM ds.questions as q WHERE q.test_id = $1'
    const valuesSelect = [test_id];
    const quizData = await pool.query(textSelect, valuesSelect)
    .catch((e) => {
      throw new Error(e.message);
    });
    const quizQuestions = quizData.rows;
    
    if (!quizQuestions || quizQuestions.length===0) {
      return undefined
    } 
    
    if (variant === "As") {
      // convert to simple {question_id:correct_answer,...}
      const questionsObject = quizQuestions
        .reduce((obj: QuizAnswers, { question_id, correct_answer }:
          {question_id: number, correct_answer: string}) => {
            obj[question_id] = correct_answer;
        return obj;
      }, {});
      return questionsObject
    } else {
      return quizQuestions.map(({ correct_answer, ...rest}: 
        { correct_answer: string, [key: string]: any }) => rest)  
    }
  }

  async checkQuiz(test_id: number, userAnswers: QuizAnswers): Promise<{} | undefined> {
    const correctAnswers: QuizAnswers = await this.getQuizQuestions(test_id, "As") as QuizAnswers;
    
    function compareAnswers(userAnswers: QuizAnswers, correctAnswers: QuizAnswers) {
      const result: QuizResults = {};
    
      // {question_id : 1/0}
      for (const [q_id, correct] of Object.entries(correctAnswers)) {
        if (userAnswers[q_id] === correct) {
          result[q_id] = 1;
        } else {
          result[q_id] = 0;
        }
      }
      return result;
    }
    const results = compareAnswers(userAnswers, correctAnswers);

    function calculateCorrectPct(correctAnswers: QuizAnswers, results: QuizResults): number {
      const numQuestions = Object.keys(correctAnswers).length;
      const numCorrectAnswers = Object.values(results).reduce((sum, a) => sum + a, 0)
      return numCorrectAnswers / numQuestions
    }
    const correctPct = calculateCorrectPct(correctAnswers,results);
    const result = {stats : {correctPct},results}
    
    return result
  }
}