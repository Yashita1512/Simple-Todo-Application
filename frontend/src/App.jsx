import { CreateTodo } from "./components/CreateTodo"
import { Todos } from './components/Todos'
import {useState, useEffect} from "react";

function App() {
  const [todos, setTodos] = useState([])

  useEffect(()=>{
    fetch("https://simple-todo-application-ten.vercel.app/todos")
      .then(async(res)=>{
          const json = await res.json();
          setTodos(json.todos)
  })},[])

  return (
    <>
      <CreateTodo todos={todos} setTodos={setTodos}/>
      <br/>
      <Todos todos={todos}/>
    </>

  )
}

export default App
