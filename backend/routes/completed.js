import express from "express";
import {todoUpdateSchema} from "../types.js" 
import {todoModel} from "../db.js"

const completedRouter = express.Router();

//editing a property in the todo object 'isCompleted' to true or false depending on the status of the todo fetched from a button on the frontend and displaying on the frontend
completedRouter.put("/", async (req,res)=>{
    const idOfTodoToUpdate = req.body._id;
    const validTodo = todoUpdateSchema.safeParse({_id:idOfTodoToUpdate});
    if(!validTodo.success){
        res.status(411).json({msg:"You sent the wrong inputs"})
        console.error("Error in here :" + validTodo.error.errors);
        return;
    }
  
    //update the todo in the database
    await todoModel.updateOne({
        _id: req.body._id 
    },   { "completed": !req.body.completed })

    res.json({
        msg: "Todo Updated"
    })
})

module.exports = completedRouter;