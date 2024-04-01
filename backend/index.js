import express from "express";
import cors from "cors";
import {todoRouter} from "./routes/todo.js";
import {todosRouter} from "./routes/todos.js";
import {completedRouter} from "./routes/completed.js";

export const app = express();
app.use(express.json());
app.use(cors());

app.use("/todo", todoRouter);
app.use("/todos", todosRouter);
app.use("/completed", completedRouter);

// Dynamically determine the port at runtime
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

