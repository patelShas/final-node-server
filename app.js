import express from 'express';
import cors from 'cors'
import UsersController
    , {anon} from "./controllers/users/users-controller.js";
import ReviewsController from "./controllers/reviews/reviews-controller.js";
import SessionController from "./session/session-controller.js";
import mongoose from "mongoose";

const CONNECTION_STRING = "mongodb+srv://spotty_reviews:sraccess@cluster0.sr1nuyy.mongodb.net/?retryWrites=true&w=majority"
import session from 'express-session'

mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.set('trust proxy', 1)
app.use(session({
    secret: "smthn_lol",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
}))
UsersController(app);
ReviewsController(app);
SessionController(app);
app.listen(4000);