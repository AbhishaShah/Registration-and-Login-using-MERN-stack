import { Strategy, ExtractJwt } from "passport-jwt";
import { model } from "mongoose";
import { key } from "./";
const User = model("users");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey;

/**
 *
 * @param {import("passport").PassportStatic} passport
 */
export const passport = (passport) => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
