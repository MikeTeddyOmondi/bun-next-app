"use client";

import { useTodoStore } from "@/stores";
import { useEffect } from "react";
import TodoCard from "./TodoCard";

export default function Todos() {
  let todos = useTodoStore((state) => state.todos);
  let getTodos = useTodoStore((state) => state.getTodos);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <ul className='todoLists'>
      {todos.map((todo) => (
        <TodoCard key={todo.id} {...todo} />
      ))}
    </ul>
  );
}
