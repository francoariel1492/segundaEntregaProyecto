class UsersRepository {
    constructor(dao){
        this.dao = dao
    }

    async getAll(){
        try {
            return await this.dao.getAll()
        } catch (error) {
            throw error``
        }
    }

    async insert(newUserInfo){
        try {
            return await this.dao.insert(newUserInfo)
        } catch (error) {
            throw error
        }
    }
}

module.exports = UsersRepository