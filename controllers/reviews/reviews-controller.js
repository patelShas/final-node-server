import * as reviewsDao from "./reviews-dao.js"

const ReviewsController = (app) => {
    app.get('/api/reviews', findReviews)
    app.get('/api/reviews/:uid', findReviewById);
    app.post('/api/reviews', createReview);
    app.delete('/api/reviews/:uid', deleteReview);
    app.put('/api/reviews/:uid', updateReview);
}

const findReviews = async (req, res) => {
    const reviews = await reviewsDao.findReviews(req.query)
    res.json(reviews)
}

const findReviewById = async (req, res) => {
    const r_ID = req.params.uid;
    const reviews = await reviewsDao.findReviewsById(r_ID)
    res.json(reviews);
}

const createReview = async (req, res) => {
    const newRev = req.body;
    await reviewsDao.createReview(newRev).then(result => newRev._id = result._id);
    res.json(newRev);
}

const deleteReview = async (req, res) => {
    const revId = req.params['uid'];
    await reviewsDao.deleteReview(revId);
    res.sendStatus(200);
}

const updateReview = async (req, res) => {
    const revId = req.params['uid'];
    const updates = req.body;
    const result = await reviewsDao.updateReview(revId, updates)
    res.sendStatus(200);
}

export default ReviewsController;