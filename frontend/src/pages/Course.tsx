import React, { useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import Footer from "../components/Footer";
import Header from "../components/Header";
import LessonCard from "../components/LessonCard";
import TestCard from "../components/TestCard";
import { getCourseData } from "../utils/api";
import { Main } from "./StudentMain";

export interface CourseData {
  lessons: {
    course_id: number;
    description: string;
    lesson_id: number;
    name: string;
  }[];
  tests: {
    course_id: number;
    description: string;
    test_id: number;
    name: string;
    passing_score: number;
  }[];
}

function Course() {
  const [courseData, setCourseData] = useState<null | CourseData>(null);
  const { id } = useParams();

  useState(() => {
    trackPromise(
      getCourseData(+id!).then((data) => {
        setCourseData(data.data);
      })
    );
  });

  return (
    <>
      <Header></Header>
      <Main>
        <h2>Материалы курса</h2>
        <CourseContent>
          <CourseInfoHeading>Уроки:</CourseInfoHeading>
          {courseData?.lessons.map((lessonData) => (
            <LessonCard
              key={lessonData.lesson_id}
              name={lessonData.name}
              lessonId={lessonData.lesson_id}
              courseId={lessonData.course_id}
            ></LessonCard>
          ))}
          {courseData?.tests.length !== 0 && (
            <CourseInfoHeading>Тесты: </CourseInfoHeading>
          )}
          {courseData?.tests.map((testData) => (
            <TestCard
              key={testData.test_id}
              name={testData.name}
              description={testData.description}
              id={testData.test_id}
            ></TestCard>
          ))}
        </CourseContent>
      </Main>
      <Footer></Footer>
    </>
  );
}

const CourseInfoHeading = styled.h2`
  padding-left: 8vw;
`;

export const CourseContent = styled.section`
  background-color: white;
  display: inline-block;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  margin-bottom: 168px;
`;

export default Course;
