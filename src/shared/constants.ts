import config from "../config";

export const JWT_EXPIRY = {
  expiresIn: "2d",
};

export const ROUNDS = 10;

export const ERRORS = {
  USER_ALREADY_EXISTS: {
    statusCode: 409,
    message: {
      error: "User Already Exists",
      error_description: "User Already Exists",
    },
  },
  USER_NOT_FOUND: {
    statusCode: 404,
    message: {
      error: "User not Signed Up",
      error_description: "User does not Exist",
    },
  },
  UNAUTHORIZED: {
    statusCode: 401,
    message: {
      error: "Unauthorized Access",
      error_description: "You don't have access to view this",
    },
  },
  MISSING_ACCESS_TOKEN: {
    statusCode: 401,
    message: {
      error: "Missing JWT Token",
      error_description: "You don't have enough credentials",
    },
  },
  INVALID_URL: {
    statusCode: 401,
    message: {
      error: "Invalid URL",
      error_description: "The URL you have entered is Invalid",
    },
  },
  URL_NOT_EXIST: {
    statusCode: 404,
    message: {
      error: "URL does not exist",
      error_description: "The URL does not exist",
    },
  },
};

export const BASEURL = `http://localhost:${config.PORT}/${config.api.prefix}`;

export const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;

export const MESSAGES = {
  SIGNED_IN: "User Signed Up Successfully",
  LOGGED_IN: "User Logged in Successfully",
  FETCH_USER: "User details fetched Successfully",
  SHORTENED_URL: "URL Shortened Successfully",
};
