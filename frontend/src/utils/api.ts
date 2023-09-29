import axios from "axios";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
  },
};

export const getCourses = async () => {
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
  return await axios.get(
    "https://ed-platform-6106.nh2023.codenrock.com/api/courses",
    config
  );
};

export const postAuth = async (login: string, password: string) => {
  return await axios
    .post(
      "https://ed-platform-6106.nh2023.codenrock.com/api/login",
      {
        email: login,
        password: password,
      },
      config
    )
    .then((data) => {
      localStorage.removeItem("isCorrect");
      localStorage.setItem("user", JSON.stringify(data.data));
    })
    .catch((data) => {
      localStorage.setItem("isCorrect", "false");
      console.log(data.response);
    });
};

export const postRegistrationData = async (
  lastName: string,
  firstName: string,
  middleName: string,
  birthday: string,
  city: string,
  email: string,
  password: string,
  role: string
) => {
  return axios
    .post(
      "https://ed-platform-6106.nh2023.codenrock.com/api/register",
      {
        lastName: lastName,
        firstName: firstName,
        middleName: middleName,
        birthDate: birthday,
        city: city,
        email: email,
        password: password,
        isTeacher: role === "Преподаватель" ? 1 : 0,
        isAdmin: role === "Администратор" ? 1 : 0,
      },
      config
    )
    .then(() => {
      localStorage.removeItem("isCorrectRegField");
    })
    .catch((data) => {
      console.log(data.response);
      localStorage.setItem("isCorrectRegField", "false");
    });
};

export const getCourseData = async (id: number) => {
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
  return await axios.get(
    `https://ed-platform-6106.nh2023.codenrock.com/api/courses/${id}`,
    config
  );
};

export const getTestData = async (id: number) => {
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
  return await axios.get(
    `https://ed-platform-6106.nh2023.codenrock.com/api/quiz/${id}`,
    config
  );
};
