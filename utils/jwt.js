const jwt = require("jsonwebtoken");

const createJwt = ({ payload }) => {
  const token = jwt.sign(payload, process.env.jwt_Secret, {
    expiresIn: process.env.jwt_expireIn,
  });
  return token;
};

// ==> verify token

const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.jwt_Secret);
};

// ===> attache cookies to to the response

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJwt({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
  // console.log("token:" + token);
};

module.exports = { createJwt, isTokenValid, attachCookiesToResponse };
