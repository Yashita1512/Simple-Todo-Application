import mongoose from "mongoose"

const mongoURL = "mongodb+srv://admin:jagtUfvOMQ0Sozrp@cluster0.qswvwcz.mongodb.net/"

mongoose.connect(mongoURL);

export const mongoTodoSchema = mongoose.Schema({
    id: String,
    key: String,
    title: String,
    description: String,
    completed: Boolean
})

export const todoModel = mongoose.model('todos', mongoTodoSchema)

 