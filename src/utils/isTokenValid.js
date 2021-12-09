import jwt from "jsonwebtoken";

export const isTokenValid = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_TOKEN, ({ err }) =>
    err ? false : true
  );
};
