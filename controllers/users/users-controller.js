import * as usersDao from './users-dao.js'


const UsersController = (app) => {
    app.get('/api/users', findUsers)
    app.post('/api/register', register);
    app.post('/api/login', login);
}

const findUsers = async (req, res) => {
    const users = await usersDao.findUsers()
    res.json(users)
}

const login = async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    const user = await usersDao.findUserByCredentials(username, password)
    res.send(user || null)
}

const register = async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var type = req.body.type;
    var bio = req.body.bio;
    var newUser = {
        username: username, password: password, type: type, bio: bio, following: []
    };
    var presentUser = await usersDao.findUser(username)
    if (!presentUser) {
        await usersDao.createUser(newUser)
        res.send(newUser)
    } else {
        res.send(null)
    }
}


export default UsersController