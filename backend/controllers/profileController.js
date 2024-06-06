const getResponseUser = require("../helpers/getResponseUser");

const user_profile = async (req, res) => {
    try {
        const user = req.user;
        const responseUser = getResponseUser(user);
        res.status(200).send(responseUser);
    } catch (error) {
        res.status(500).send('Server error');
    }
}

module.exports = { user_profile }