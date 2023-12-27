"use client";

import { Todo, useTodoStore } from "@/stores";
import { useState } from "react";
import { v4 } from "uuid";

export default function TodoCard({ public_id, title, completed }: Todo) {
  const removeTodos = useTodoStore((state) => state.removeTodos);
  const completeTodos = useTodoStore((state) => state.completeTodos);
  const [isChecked, setIsChecked] = useState<boolean | undefined>(completed);

  const handleCompleteTodo = (pid: typeof v4) => {
    console.log(`Update: ${pid}`);
    completeTodos(pid);
    setIsChecked(!isChecked);
  };

  const handleDelete = (pid: typeof v4) => {
    console.log(`Delete: ${pid}`);
    removeTodos(pid);
  };

  return (
    <>
      <li
        className='list pending'
        onClick={() => {
          if (public_id !== undefined) {
            handleCompleteTodo(public_id);
          }
          return;
        }}
        onDoubleClick={() => {
          if (public_id !== undefined) {
            handleDelete(public_id);
          }
          return;
        }}
      >
        <input type='checkbox' checked={isChecked} readOnly />
        <span className='task' data-id={`${public_id}`}>{`${title}`}</span>
        <i className='uil uil-trash'></i>
      </li>
    </>
  );
}
