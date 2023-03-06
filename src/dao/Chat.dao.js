const Chat = require("../models/chat.model");

class ChatManager {

    async saveMesagge(mesagge) {
        try {

            const mongoSaveMesagge = await Chat.create(mesagge);
            return "mesagge saved successfully";
        }
        catch (error) {
            return error;
        }
    }

    async getMesagges() {
        try {
            const mongoGetMesagge = await Chat.find();
            return mongoGetMesagge;
        }
        catch (error) {
            return error;
        }
    }

}

module.exports = { ChatManager };