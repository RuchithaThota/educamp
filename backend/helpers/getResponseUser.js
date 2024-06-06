const getResponseUser = (user) => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        googleId: user.googleId,
        username: user.username,
        profileUrl: user.profileUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}

module.exports = getResponseUser;