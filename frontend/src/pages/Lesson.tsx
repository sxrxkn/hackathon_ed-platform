import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Main } from "./StudentMain";
import { getCourseData } from "../utils/api";
import { CourseContent, CourseData } from "./Course";

import "../styles/Form.css";
import { trackPromise } from "react-promise-tracker";

function Lesson() {
  const [courses, setCourses] = useState<CourseData | null>(null);
  const [lesson, setLesson] = useState<null | {
    description: string;
    name: string;
  }>(null);
  const { id, lessonId } = useParams();

  useEffect(() => {
    trackPromise(
      getCourseData(+id!).then((data) => {
        setCourses(data.data);
      })
    );
  }, [id]);

  useEffect(() => {
    courses?.lessons.forEach((lesson) => {
      if (+lessonId!.slice(1) === +lesson.lesson_id) {
        setLesson({ description: lesson.description, name: lesson.name });
      }
    });
  }, [courses?.lessons, lessonId]);

  return (
    <>
      <Header></Header>
      <Main>
        <CourseContent>
          <h2>{lesson?.name}</h2>
          <p>{lesson?.description}</p>
        </CourseContent>
      </Main>
      <Footer></Footer>
    </>
  );
}

export default Lesson;
