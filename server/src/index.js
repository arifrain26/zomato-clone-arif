import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";

//private route authorization config
import privateRouteconfig from "./config/route.config";
import googleAuthConfig from "./config/google.config";

// datbase connection
import ConnectDB from "./database/connnection";

import Auth from "./api/auth";
import Food from "./api/food";
import Restaurant from "./api/restaurant";
import User from "./api/user";
import Menu from "./api/menu";
import Order from "./api/order";
import Review from "./api/review";
import Image from "./api/image";

dotenv.config();

const zomato = express();

//adding additional passport
privateRouteconfig(passport);
googleAuthConfig(passport);

zomato.use(cors({ origin: "http://localhost:3000" }));
zomato.use(helmet());
zomato.use(express.json());
zomato.use(
  session({
    secret: process.env.JWTSECRET,
    resave: true,
    saveUninitialized: true,
  })
);
zomato.use(passport.initialize());
zomato.use(passport.session());

zomato.get("/", (req, res) => {
  res.json({
    message: "Server is runnig",
  });
});

//  /api
zomato.use("/auth", Auth);
zomato.use("/food", Food);
zomato.use("/restaurant", Restaurant);
zomato.use("/user", User);
zomato.use("/menu", Menu);
zomato.use("/order", Order);
zomato.use("/review", Review);
zomato.use("/image", Image);

const PORT = 4000;
zomato.listen(PORT, () => {
  ConnectDB()
    .then(() => {
      console.log("Db is connected");
    })
    .catch((error) => {
      console.log("server is running , but databse connection failed...");
      console.log(error);
    });

  console.log("server is running!!!!");
});
