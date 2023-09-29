import { pool } from '../db/db.js';
import QuizService from './quiz.service.js';

const quizService = new QuizService();

export default class CourseService {
  async getCourses(): Promise<any[]>  {
    const textSelect = `SELECT c.*, string_agg(ct.tag_name, ', ') AS tags
                        FROM ds.courses c
                        LEFT JOIN ds.course_tag ct ON c.course_id = ct.course_id
                        GROUP BY c.course_id;`
    const courses = await pool.query(textSelect)
      .catch((e) => {
        console.error(e);
        return []
      }) as { rows: any[] };
    
    const result = courses.rows.map(row => {
      return {
        ...row,
        tags: row.tags.split(", ")
      }
    });
    return result
  }

  async getCourse(id: number): Promise<Object | undefined> {
    const courses = await this.getCourses();
    const found_course = courses.find((course) => course.course_id === id)
    if (!found_course) {
      return undefined
    }


    const textSelect = 'SELECT * FROM ds.lessons as lessons WHERE lessons.course_id = $1;'
    const valuesSelect = [id];
    const lessons = await pool.query(textSelect, valuesSelect)
    .catch((e) => {
      throw new Error(e.message);
    });

    const testsResult = await quizService.getQuizInfo(id);

    const result = 
      {
        lessons: lessons.rows,
        tests: testsResult
      }
    return result
  }
}