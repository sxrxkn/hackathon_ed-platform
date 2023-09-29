export const validateRequiredFields = (value: string) => {
  if (!value) {
    return "Required field";
  }
};

export const validateEmail = (value: string) => {
  if (!value) {
    return "Required";
  } else if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      value
    )
  ) {
    return "Email invalid adress";
  }
};

export const validateDate = (value: Date) => {
  if (!value) {
    return "Required field";
  }
  const parts = String(value).split("-");
  const day = parseInt(parts[2]);
  const month = parseInt(parts[1]);
  const year = parseInt(parts[0]);

  if (year < 1950 || year > 2023 || month === 0 || month > 12)
    return "Enter the correct date";

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
    monthLength[1] = 29;

  if (!(day > 0 && day <= monthLength[month - 1]))
    return "Enter the correct date";
};
