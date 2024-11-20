import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
    name:"string",
    city:"string",
    category:"string",
})

export const StudentModel = mongoose.model('Student', studentSchema)