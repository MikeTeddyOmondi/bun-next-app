"use client";

import { useMemo } from "react";
import { useTodoStore } from "@/stores";

export default function TodoStats() {
  const todos = useTodoStore((state) => state.todos);
  const clearTodos = useTodoStore((state) => state.clearTodos);
  const numberTodos = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  const handleClearTodos = () => {
    clearTodos();
  };

  return (
    <div className='pending-tasks'>
      <span>
        You have{" "}
        <span className='pending-num'>
          {" "}
          {numberTodos !== 0 ? numberTodos : "no"}{" "}
        </span>{" "}
        task(s) pending.
      </span>
      {numberTodos !== 0 ? (
        <button
          type='submit'
          className='clear-btn'
          onClick={handleClearTodos}
        >
          Clear All
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
