class UsersMemoryDao{
    constructor(){
        this.data = []
    }

    async getAll(){
        try {
            return this.data
        } catch (error) {
            return error
        }
    }

    async insert(newUserInfo){
        try {
            this.data.push(newUserInfo)
            return newUserInfo
        } catch (error) {
            return error
        }
    }
}

module.exports = UsersMemoryDao