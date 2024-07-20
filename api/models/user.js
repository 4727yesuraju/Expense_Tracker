import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName : {
        required : [true,"username is required"],
        type : String,
    },
    email : {
        required : [true,"email is required"],
        type : String,
    },
    password : {
        required : [true,"password is required"],
        type : String,
    },
},{
    timestamps : true
});

const User = mongoose.model("User",userSchema);

export default User;
