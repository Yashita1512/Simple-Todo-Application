import express from "express";
import {todoCreateSchema, todoUpdateSchema} from "./types.js" 
import {todoModel} from "./db.js"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())

//posts a new todo to the server then to the database
app.post("/todo", async (req,res)=>{
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


//gets all todos from the database and displays on the frontend
app.get("/todos", async (req,res)=>{
    const todos = await todoModel.find({})
    res.json({todos})
})


//editing a property in the todo object 'isCompleted' to true or false depending on the status of the todo fetched from a button on the frontend and displaying on the frontend
app.put("/completed", async (req,res)=>{
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


// Dynamically determine the port at runtime
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});