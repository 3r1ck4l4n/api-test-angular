const bcrypt = require('bcrypt');

module.exports = hashPass = {
    hash: (password) => {
        return bcrypt.hashSync(password, 10);
    },
    compare: (password, hash) => {
        return bcrypt.compareSync(password, hash);
    }
};