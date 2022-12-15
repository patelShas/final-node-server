import * as usersDao from './users-dao.js'


const UsersController = (app) => {
    app.get('/api/users', findUsers)
    app.get('/api/auth/profile', profile)
    app.post('/api/auth/register', register);
    app.post('/api/auth/login', login);
    app.post('/api/auth/logout', logout);

}

export const anon = {
    username: "Anon",
    password: "N/A",
    type: "ANON",
    bio: "You aren't currently logged in. Some content is unavailable",
    following: []
}

const findUsers = async (req, res) => {
    const users = await usersDao.findUsers()
    res.json(users)
}

const profile = (req, res) => {
    res.send(req.session['profile'] || anon);
}

const login = async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    const user = await usersDao.findUserByCredentials(username, password)
    if (user) {
        req.session['profile'] = user;
        res.send(user)
    } else {
        res.send(anon)
    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.send(anon);
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
    if (!presentUser && username !== "Anon") {
        await usersDao.createUser(newUser)
        req.session['profile'] = newUser;
        res.send(newUser)
    } else {
        res.send(anon)
    }
}


export default UsersController