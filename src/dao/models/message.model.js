import { Schema, model } from "mongoose";

const nameCoollection = "message";

const messageSchema = Schema({
  user: {
    Type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const MessageModel = model(nameCoollection, messageSchema);

export default MessageModel;
