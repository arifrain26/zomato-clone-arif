import JwtPassport from "passport-jwt";
import { UserModel } from "../database/allModels";

const JWTStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

//Head : {
//  Authorization : "Bearer  alskjdfjasdkjfalkjdfksjdkjflkasjd"
//}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ZomatoApp",
  //this zomatoapp key is from databse/user/index.js
  //generateJwtToken function
};

export default (passport) => {
  passport.use(
    new JWTStrategy(options, async (jwt__payload, done) => {
      try {
        const doesUserExist = await UserModel.findById(jwt__payload.user);
        if (!doesUserExist) return done(null, false);
        return done(null, doesUserExist);
      } catch (error) {
        throw new Error(error);
      }
    })
  );
};
//its also a middleware
