const User = require("./models/user.model")

class UsersMongoDao{
    constructor(){}

    async getAll(){
        try {
            return await User.find()
        } catch (error) {
            return error
        }
    }

    async insert(newUserInfo){
        try {
            return await User.create(newUserInfo)
        } catch (error) {
            throw error
        }
    }
}

module.exports = UsersMongoDao