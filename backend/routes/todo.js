import express from "express";
import {todoCreateSchema, todoUpdateSchema} from "./types.js" 
import {todoModel} from "./db.js"

const todoRouter = express.Router();

todoRouter.post("/", async (req,res)=>{
    const todo = req.body;
    const validTodo = todoCreateSchema.safeParse(todo);
    if(!validTodo.success){
        res.status(411).json({msg:"You sent the wrong inputs"})
        console.error(validTodo.error.errors);
        return;
    }
    //put the validTodo.data to mongoDB
    await todoModel.create({
        key: validTodo.data.key,
        title: validTodo.data.title,
        description: validTodo.data.description,
        completed : validTodo.data.completed
    })
    res.json({msg:"Todo created"})
})

module.exports = todoRouter;