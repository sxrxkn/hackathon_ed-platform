import React from "react";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

interface LessonCardProps {
  name: string;
  lessonId: number;
  courseId: number;
}

function LessonCard({ name, lessonId, courseId }: LessonCardProps) {
  const navigate = useNavigate();
  return (
    <LessonCardContainer>
      <LessonHeader>{name}</LessonHeader>
      <StartTestButton
        onClick={() => {
          navigate(`/courses/${courseId}/lesson/:${lessonId}`);
        }}
      >
        Открыть урок
      </StartTestButton>
    </LessonCardContainer>
  );
}

const LessonHeader = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const StartTestButton = styled.button`
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  background-color: #0877c7;
  width: 10vw;
  height: 30px;
  border-radius: 5px;
`;

const LessonCardContainer = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: #94cbf2;
  width: 80%;
  height: 100%;
  border-radius: 20px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 50px;
`;

export default LessonCard;
