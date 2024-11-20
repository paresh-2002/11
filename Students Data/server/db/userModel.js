import mongoose from "mongoose";
const {Schema, model} = mongoose

const userSchema = new Schema({
    userName:'string',
    email:{type:'string', required:true, unique:true},
    password:{type:'string', required:true},
    role:'string',
})

export const userModel = model('user', userSchema);