import jwt from "jsonwebtoken";

export const getUser = async (req) => {
  const auth = req.headers.authorization || "";
  if (!auth) {
    return { ok: false, error: "you must be logged in!" };
  }

  const token = auth.split("Bearer ")[1];

  if (!token) {
    return { ok: false, error: "you should provide a token!" };
  }

  const user = jwt.verify(
    token,
    process.env.JWT_SECRET_TOKEN,
    (err, decoded) => {
      if (err) {
        return { ok: false, error: "invalid token!" };
      }
      return { ok: true, decoded };
    }
  );
  return user;
};
