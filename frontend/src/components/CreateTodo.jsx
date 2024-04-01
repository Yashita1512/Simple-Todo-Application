import {useEffect, useState} from "react"
import { v4 as uuidv4 } from 'uuid';

export function CreateTodo(props){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    return <div><br/>
        <input type="text" placeholder="Title"  value={title} onChange={(e)=>{
                setTitle(e.target.value)
            }}></input><br/><br/>

        <input type="text" placeholder="Description" value = {description} onChange={(e)=>{
                setDescription(e.target.value)
            }}></input><br/><br/>

        <button onClick={()=>{
            fetch("https://simple-todo-application-ten.vercel.app/todo",
                   {
                    method: "POST",
                    body: JSON.stringify({
                        key: uuidv4(),
                        title: title,
                        description: description,
                        completed : false
                    }),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                   }) 
            .then(()=>{console.log("Todo added")})
            props.setTodos([...props.todos, {
                key: uuidv4(), title: title, description : description, completed: false}])
            setTitle("");
            setDescription("");
            
        }}>Add a Todo</button>
    </div>
}