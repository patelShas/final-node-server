import * as usersDao from './users-dao.js'


const UsersController = (app) => {
    app.get('/api/users', findUsers)
    app.get('/api/auth/profile', profile)
    app.post('/api/auth/register', register);
    app.post('/api/auth/login', login);
    app.post('/api/auth/logout', logout);

    app.put('/api/auth/:uname', updateUser)

    app.get('/api/user/:user_name', findUser)

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
    users.map(user => {
        user.password = "nice_try"
    })
    res.json(users)
}

const findUser = async (req, res) => {
    const user_name = req.params['user_name']
    const user = await usersDao.findUser(user_name)
    user.password = "nice_try"
    res.json(user)
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

const updateUser = async (req, res) => {
    const updates = req.body;
    const uid = updates._id
    const results = await usersDao.updateUser(uid, updates)
    req.session['profile'] = updates;
    res.send(updates)
}


export default UsersController