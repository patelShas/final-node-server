import express from 'express';
import cors from 'cors'
import UsersController
    , {anon} from "./controllers/users/users-controller.js";
import ReviewsController from "./controllers/reviews/reviews-controller.js";
import SessionController from "./session/session-controller.js";
import mongoose from "mongoose";

import session from 'express-session'

mongoose.connect(process.env.SPOTTY_CONNECTION_STRING);
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.SPOTTY_REACT || 'http://localhost:3000'
}));
app.use(express.json());
app.set('trust proxy', 1)
app.use(session({
    secret: process.env.SPOTTY_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
}))
UsersController(app);
ReviewsController(app);
SessionController(app);
app.listen(process.env.PORT || 4000);