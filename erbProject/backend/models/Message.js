import mongoose from "mongoose";
const {Schema} = mongoose;

const MessageSchema = new Schema(
    {
        sender:{
            type: mongoose.Types.ObjectId,
            required: true,
        },
        item:{
            type: mongoose.Types.ObjectId,
            required: true,
        },
        content:{
            type: String,
            required: true,
        },
        status:{
            type: String,
            required: true,
        },
        date:{
            type: Date,
            default: Date.now,
        },
    }
);

const Message = mongoose.model("messages", MessageSchema);
export default Message;
