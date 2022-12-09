import express from 'express';
import cors from 'cors'
import HelloController
    from "./controllers/hello-controller.js";
import UsersController
    from "./controllers/users/users-controller.js";
import ReviewsController from "./controllers/reviews/reviews-controller.js";
const app = express();
app.use(cors());
app.use(express.json());
HelloController(app);
UsersController(app);
ReviewsController(app);
app.listen(4000);