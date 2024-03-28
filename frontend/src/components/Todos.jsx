import { useState } from "react";

export function Todos({todos}){
    const [completedTodoIds, setCompletedTodoIds] = useState([])

    function markTodoAsComplete(id){
        fetch("http://localhost:3000/completed",
        {
            method:"PUT",
            body:JSON.stringify({
                    _id: id
                }),
            headers:   {
                    'Content-Type': 'application/json'
                }
        }).then(()=>{
            setCompletedTodoIds(prevIds=>[...prevIds, id])
            }) 
        }

   return <>
    {todos.map((todo)=>(
        <div key={todo.key}>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button onClick={()=>{markTodoAsComplete(todo._id)}}>
                {completedTodoIds.includes(todo._id)? "Completed" : "Mark as Completed"}</button>
        </div>
    ))}
   </>
}

