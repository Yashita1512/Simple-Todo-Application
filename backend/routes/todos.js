import express from "express";
import {todoModel} from "./db.js"

const todosRouter = express.Router();

//gets all todos from the database and displays on the frontend
todosRouter.get("/", async (req,res)=>{
    const todos = await todoModel.find({})
    res.json({todos})
})

module.exports = todosRouter;