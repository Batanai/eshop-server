import expressJwt from "express-jwt";

export const authJwt = () => {
  const secret = process.env.JWT_SECRET;

  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      "/api/v1/users/login",
      "/api/v1/users/register",
      { url: /\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/categories(.*)/, methods: ["GET", "OPTIONS"] },
    ],
  });
};

const isRevoked = async (req, payload, done) => {
  if (!payload.isAdmin) done(null, true);

  done();
};
