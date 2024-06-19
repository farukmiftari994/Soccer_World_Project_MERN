import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  //! inside payload we include "REGISTERED" claims (such as "sub", "iss")
  const payload = {
    sub: userId,
  };

  //! SecretOrPRivateKey is our own password needed to generate and later validate the token

  const signOrPrivateKey = process.env.TOKEN_SECRET_KEY;

  //! inside signOptions we can include the "longer Or Private Claims" and other custom claims
  const signOptions = {
    expiresIn: "2d",
  };
  const jsonwebtoken = jwt.sign(payload, signOrPrivateKey, signOptions);
  return jsonwebtoken;
};

export { generateToken };
