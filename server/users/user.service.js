const config = require('config.json');
const jwt = require('jsonwebtoken');
const sqlite = require('sqlite');

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
  return sqlite.open(`${__dirname}/../data/database.sqlite`, { Promise }).then(async db => {

    const user = await db.get(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`);
    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
  });
}

async function getAll() {
  return sqlite.open(`${__dirname}/../data/database.sqlite`, { Promise }).then(async db => {
    const users = await db.all('SELECT * FROM users;');

    return users.map(u => omitPassword(u));
  });
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
