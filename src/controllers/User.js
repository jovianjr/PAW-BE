const User = require('@src/models/User');

const findUserController = async (req, res) => {
    const findUserController = await User.find().where('this.name.includes(name');

    console.log(findUserController)
    res.send(findUserController);
}



module.exports = {findUserController};