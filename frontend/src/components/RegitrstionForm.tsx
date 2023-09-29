import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import styled from "styled-components";
import { postAuth, postRegistrationData } from "../utils/api";
import { useNavigate } from "react-router-dom";
import {
  validateDate,
  validateEmail,
  validateRequiredFields,
} from "../utils/validate";
import { ButtonContainer, ErrorMessage, LinkToOtherForm } from "./AuthForm";
import { trackPromise } from "react-promise-tracker";

function RegitrstionForm({ onClick }: any) {
  const [isCorrect, setCorrect] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        lastName: "",
        firstName: "",
        middleName: "",
        birthday: "",
        city: "",
        email: "",
        role: "",
        password: "",
      }}
      onSubmit={(initialValues) => {
        trackPromise(
          postRegistrationData(
            initialValues.lastName,
            initialValues.firstName,
            initialValues.middleName,
            initialValues.birthday,
            initialValues.city,
            initialValues.email,
            initialValues.password,
            initialValues.role
          ).then(() => {
            postAuth(initialValues.email, initialValues.password).then(() => {
              if (localStorage.getItem("isCorrectRegField") === "false") {
                setCorrect(false);
              } else {
                navigate("/courses");
              }
            });
          })
        );
      }}
    >
      {({ errors, touched }) => (
        <Form className="form">
          <FormHeading>Регистрация</FormHeading>
          <div>
            <div>
              <Field
                className={`form__field  ${
                  errors.lastName && touched.lastName
                    ? "form__invalid-field"
                    : touched.lastName
                    ? "form__valid-field"
                    : ""
                }`}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Введите фамилию"
                validate={validateRequiredFields}
              ></Field>
            </div>

            <Field
              className={`form__field  ${
                errors.firstName && touched.firstName
                  ? "form__invalid-field"
                  : touched.firstName
                  ? "form__valid-field"
                  : ""
              }`}
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Введите имя"
              validate={validateRequiredFields}
            ></Field>

            <Field
              className={`form__field  ${
                errors.middleName && touched.middleName
                  ? "form__invalid-field"
                  : touched.middleName
                  ? "form__valid-field"
                  : ""
              }`}
              type="text"
              name="middleName"
              id="middleName"
              placeholder="Введите отчество"
              validate={validateRequiredFields}
            ></Field>

            <div>
              <Field
                className={`form__field  ${
                  errors.birthday && touched.birthday
                    ? "form__invalid-field"
                    : touched.birthday
                    ? "form__valid-field"
                    : ""
                }`}
                type="date"
                name="birthday"
                id="birthday"
                placeholder="Введите дату рождения"
                validate={validateDate}
              ></Field>
            </div>

            <div>
              <Field
                className={`form__field  ${
                  errors.city && touched.city
                    ? "form__invalid-field"
                    : touched.city
                    ? "form__valid-field"
                    : ""
                }`}
                type="text"
                name="city"
                id="city"
                placeholder="Введите город"
                validate={validateRequiredFields}
              ></Field>
            </div>

            <div>
              <Field
                className={`form__field  ${
                  errors.email && touched.email
                    ? "form__invalid-field"
                    : touched.email
                    ? "form__valid-field"
                    : ""
                }`}
                type="text"
                name="email"
                id="email"
                placeholder="Введите почту"
                validate={validateEmail}
              ></Field>
            </div>

            <div>
              <Field
                as="select"
                className={`form__field form__field_update-width  ${
                  errors.role && touched.role
                    ? "form__invalid-field"
                    : touched.role
                    ? "form__valid-field"
                    : ""
                }`}
                type="text"
                name="role"
                list="terms"
                id="role"
                validate={validateRequiredFields}
              >
                <option style={{ display: "none" }}></option>
                <option value="Студент">Студент</option>
                <option value="Преподаватель">Преподаватель</option>
                <option value="Администратор">Администратор</option>
              </Field>
            </div>

            <div>
              <Field
                className={`form__field  ${
                  errors.password && touched.password
                    ? "form__invalid-field"
                    : touched.password
                    ? "form__valid-field"
                    : ""
                }`}
                type="text"
                name="password"
                id="password"
                placeholder="Введите пароль"
                validate={validateRequiredFields}
              ></Field>
            </div>
          </div>
          {!isCorrect && (
            <ErrorMessage>Введены некорректные данные</ErrorMessage>
          )}

          <ButtonContainer>
            <LinkToOtherForm onClick={onClick}>Войти в аккаунт</LinkToOtherForm>
            <div>
              <SubmitButton type="submit" value="default">
                Продолжить
              </SubmitButton>
            </div>
          </ButtonContainer>
        </Form>
      )}
    </Formik>
  );
}

export const SubmitButton = styled.button`
  border: none;
  width: 100px;
  background-color: №f7c6c6;
  cursor: pointer;
  border-radius: 20px;
  height: 30px;
`;

export const FormHeading = styled.h2`
  text-align: center;
  margin-top: 0;
`;

export default RegitrstionForm;
