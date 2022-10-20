import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    isLogin: {
        type: Boolean,
        default: false,
        require: true
    },
    firstName: {
        type: String,
        required: false,
    }, 
    lastName: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    avatar:{
        data:{type: Buffer},
        contentType:{type: String}
    }
})

const User = mongoose.model("users", UserSchema);
export default User;