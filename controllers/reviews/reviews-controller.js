import hot_takes from "./reviews.js"
let reviews = hot_takes

const ReviewsController = (app) => {
    app.get('/api/reviews', findReviews)
    app.get('/api/reviews/:uid', findReviewById);
    app.post('/api/reviews', createReview);
    app.delete('/api/reviews/:uid', deleteReview);
    app.put('/api/reviews/:uid', updateReview);
}

const findReviews = (req, res) => {
    const album_id = req.query.album_id
    if(album_id) {
        const albumReviews = reviews
            .filter(u => u.album_id === album_id)
        res.json(albumReviews)
        return
    }
    res.json(reviews)
}

const findReviewById = (req, res) => {
    const revID = req.params.uid;
    const revs = reviews
        .find(r => r._id === revID);
    res.json(revs);
}

const createReview = (req, res) => {
    const newRev = req.body;
    newRev._id = (new Date()).getTime() + '';
    reviews.push(newRev);
    res.json(newRev);
}

const deleteReview = (req, res) => {
    const revId = req.params['uid'];
    reviews = reviews.filter(rev =>
        rev._id !== revId);
    res.sendStatus(200);
}

const updateReview = (req, res) => {
    const revId = req.params['uid'];
    const updates = req.body;
    reviews = reviews.map((rev) =>
        rev._id === revId ?
            {...rev, ...updates} :
            rev
    );
    res.sendStatus(200);
}

export default ReviewsController;