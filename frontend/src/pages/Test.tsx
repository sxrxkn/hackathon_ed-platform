import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { getTestData } from "../utils/api";
import { Main } from "./StudentMain";

import "../styles/Form.css";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";

interface TestData {
  question_id: number;
  test_id: number;
  name: string;
  description: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  answer_5: string;
}

function Test() {
  const [testData, setTestData] = useState<null | TestData[]>(null);
  const [stats, setStats] = useState<any | null>(null);
  const navigate = useNavigate();
  const { testId } = useParams();

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("user") || "{}").token
      }`,
    },
  };

  useEffect(() => {
    trackPromise(
      getTestData(+testId!).then((data) => {
        setTestData(data.data);
      })
    );
  }, [testId]);

  return (
    <>
      <Header></Header>
      <Main>
        <Formik
          initialValues={{ value: "" }}
          onSubmit={async (values) => {
            return trackPromise(
              axios
                .post(
                  `https://ed-platform-6106.nh2023.codenrock.com/api/quiz/${testId}`,
                  values,
                  config
                )
                .then((data) => {
                  setStats(data.data);
                })
            );
          }}
        >
          {({ errors, touched }) => (
            <Form className="form form__question">
              {testData?.map((test) => {
                return (
                  <div key={test.name}>
                    <Question id="my-radio-group">
                      <QuestionHeader>{test.name}</QuestionHeader>
                      <div
                        dangerouslySetInnerHTML={{ __html: test.description }}
                      ></div>
                    </Question>
                    <FormGroup role="group" aria-labelledby="my-radio-group">
                      {test.answer_1 && (
                        <QuestionLabel>
                          <Field
                            type="radio"
                            name={test.question_id}
                            value={test.answer_1}
                          />
                          {test.answer_1}
                        </QuestionLabel>
                      )}
                      {test.answer_2 && (
                        <QuestionLabel>
                          <Field
                            type="radio"
                            name={test.question_id}
                            value={test.answer_2}
                          />
                          {test.answer_2}
                        </QuestionLabel>
                      )}
                      {test.answer_3 && (
                        <QuestionLabel>
                          <Field
                            type="radio"
                            name={test.question_id}
                            value={test.answer_3}
                          />
                          {test.answer_3}
                        </QuestionLabel>
                      )}
                      {test.answer_4 && (
                        <QuestionLabel>
                          <Field
                            type="radio"
                            name={test.question_id}
                            value={test.answer_4}
                          />
                          {test.answer_4}
                        </QuestionLabel>
                      )}

                      {(stats && stats.results[test.question_id] && (
                        <CorrectAnswer>Правильный ответ</CorrectAnswer>
                      )) ||
                        ""}
                      {stats && !stats.results[test.question_id] && (
                        <IncorrectAnswer>Неправильный ответ</IncorrectAnswer>
                      )}
                    </FormGroup>
                  </div>
                );
              })}
              <ButtonContainer>
                {(stats && (
                  <EndTestContainer>
                    <Stats>
                      Ваш результат:{" "}
                      {Math.floor(parseFloat(stats.stats.correctPct) * 1000) /
                        10}
                      %
                    </Stats>
                    <SubmitButton
                      type="submit"
                      onClick={() => {
                        navigate("/courses");
                      }}
                    >
                      Вернуться на главную страницу
                    </SubmitButton>
                  </EndTestContainer>
                )) || (
                  <SubmitButton type="submit">
                    Отправить тест на проверку
                  </SubmitButton>
                )}
              </ButtonContainer>
            </Form>
          )}
        </Formik>
      </Main>
      <Footer></Footer>
    </>
  );
}

const Question = styled.div`
  padding-top: 30px;
`;

const CorrectAnswer = styled.p`
  color: green;
`;

const IncorrectAnswer = styled.p`
  color: red;
`;

const QuestionLabel = styled.label`
  padding-left: 10px;
`;

const Stats = styled.p`
  font-size: 26px;
  margin-bottom: 0;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const EndTestContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QuestionHeader = styled.h4`
  margin-top: 0;
`;

const SubmitButton = styled.button`
  width: 10vw;
  height: auto;
  border: none;
  margin-top: 30px;
  cursor: pointer;
  border-radius: 10px;
  background-color: rgba(167, 99, 184, 0.57);
  font-size: 18px;
  padding: 5px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Test;
