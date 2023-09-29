import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import styled from "styled-components";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getCourses } from "../utils/api";

export interface Course {
  course_id: number;
  name: string;
  description: string;
  author: string;
  tags: string[];
  is_open: boolean;
  cover_link: string;
}

function StudentMain() {
  const [courses, setCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    trackPromise(
      getCourses().then((data) => {
        setCourses(data.data);
      })
    );
  }, []);

  return (
    <>
      <Header></Header>
      <Main>
        <h2>Мои курсы</h2>
        <CourseContainer>
          {courses?.map((courseData) => (
            <CourseCard
              key={courseData.course_id}
              name={courseData.name}
              description={courseData.description}
              image={courseData.cover_link}
              author={courseData.author}
              tags={courseData.tags}
              isOpen={courseData.is_open}
              id={courseData.course_id}
            />
          ))}
        </CourseContainer>
      </Main>
      <Footer></Footer>
    </>
  );
}

export const Main = styled.main`
  width: 86%;
  margin: 0 auto;
`;

const CourseContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  padding-bottom: 168px;
`;

export default StudentMain;
