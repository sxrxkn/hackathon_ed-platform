import express, { Request, Response } from "express";

import CourseService from '../services/course.service.js';


const router = express.Router();
const courseService = new CourseService();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const courses = await courseService.getCourses();
    res.json(courses);
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const courseId = parseInt(req.params.id);
    const course = await courseService.getCourse(courseId);

    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: `Course with id ${courseId} not found` });
    }
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
