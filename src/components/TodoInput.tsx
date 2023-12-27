"use client";

import { Todo, useTodoStore } from "@/stores";

export default function TodoInput() {
  const addTodo = useTodoStore((state) => state.addTodos);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { title } = Object.fromEntries(formData);

    if (typeof title !== "string") return;
    if (title === "") return;

    let todo: Todo = {
      title,
      description: "description",
    };
    console.log(todo);

    addTodo(todo);
    form.reset();
  };
  return (
    <div className='input-field'>
      <form onSubmit={handleSubmit}>
        <input
          className='text-area'
          name='title'
          placeholder='Enter new todo'
        />
        <i className='uil uil-notes note-icon'></i>
      </form>
    </div>
  );
}
