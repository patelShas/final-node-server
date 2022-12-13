import express from 'express';
import cors from 'cors'
import HelloController
    from "./controllers/hello-controller.js";
import UsersController
    from "./controllers/users/users-controller.js";
import ReviewsController from "./controllers/reviews/reviews-controller.js";
import mongoose from "mongoose";
const CONNECTION_STRING = "mongodb+srv://spotty_reviews:sraccess@cluster0.sr1nuyy.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors());
app.use(express.json());
HelloController(app);
UsersController(app);
ReviewsController(app);
app.listen(4000);