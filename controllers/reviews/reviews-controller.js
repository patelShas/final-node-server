import hot_takes from "./reviews.js"
import * as reviewsDao from "./reviews-dao.js"
let reviews = hot_takes

const ReviewsController = (app) => {
    app.get('/api/reviews', findReviews)
    app.get('/api/reviews/:uid', findReviewById);
    app.post('/api/reviews', createReview);
    app.delete('/api/reviews/:uid', deleteReview);
    app.put('/api/reviews/:uid', updateReview);
}

const findReviews = async (req, res) => {
    if (req.query.reviewer) {
        findReviewsByUser(req, res)
        return
    } else if (req.query.album_id) {
        findReviewsByAlbum(req, res)
        return
    }
    const reviews = await reviewsDao.findReviews()
    res.json(reviews)
}

const findReviewsByAlbum = async (req, res) => {
    const album_id = req.query.album_id
    const reviews = await reviewsDao.findReviewsByAlbum(album_id)
    res.json(reviews)
}

const findReviewsByUser = async (req, res) => {
    const user_name = req.query.reviewer
    const reviews = await reviewsDao.findReviewsByUser(user_name)
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
    await reviewsDao.updateReview(revId, updates)
    res.sendStatus(200);
}

export default ReviewsController;