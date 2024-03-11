import passport from "passport";

const jwtAuth = passport.authenticate("jwt", { session: false });

export default jwtAuth;

//? By using JWT authentication, you can secure your routes or endpoints in your application,
//? ensuring that only users with valid JWT tokens can access them.
