import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = Schema({
    username: String,
    password: String,
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
