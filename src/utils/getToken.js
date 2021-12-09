import jwt from "jsonwebtoken";

export const getToken = ({ id, email, firstName, lastName }) =>
  jwt.sign(
    {
      id,
      email,
      firstName,
      lastName,
    },
    process.env.JWT_SECRET_TOKEN,
    { expiresIn: "1d" }
  );
