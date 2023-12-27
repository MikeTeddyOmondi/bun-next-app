import { v4 } from "uuid";
import { create } from "zustand";

export type Todo = {
  title: string;
  description?: string;
  completed?: boolean;
  readonly id?: number;
  readonly public_id?: typeof v4;
};

type ServerResponse = {
  data: { message: string };
  params: { id: typeof v4 };
};

type FetchResponse<T> = {
  data: T;
  success: boolean;
};

export type State = {
  todos: Todo[];
  error: string | null;
  isLoading: boolean;
};

export type Actions = {
  getTodos: () => void;
  addTodos: (todo: Todo) => void;
  removeTodos: (pid: typeof v4) => void;
  completeTodos: (pid: typeof v4) => void;
  updateTodos: (todo: Todo) => void;
  clearTodos: () => void;
};

export const useTodoStore = create<State & Actions>()((set, get) => ({
  todos: [],
  error: null,
  isLoading: false,
  getTodos: async () => {
    try {
      set({ isLoading: true });
      const todos = await fetchData();
      set({ isLoading: false, todos: todos });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  addTodos: async (todo: Todo) => {
    try {
      set({ isLoading: true });
      const newTodo = await fetchPostData(todo);
      const todosArray = [...get().todos, newTodo];
      set({ isLoading: false, todos: todosArray });
      // set((state) => ({
      //   isLoading: false,
      //   data: [...state.data, response.data],
      // }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  removeTodos: async (pid: typeof v4) => {
    try {
      set({ isLoading: true });
      const data = await fetchDeleteData(pid);
      const remainingTodos = get().todos.filter(
        (todo) => todo.public_id !== pid
      );
      set({ isLoading: false, todos: remainingTodos });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  completeTodos: async (pid: typeof v4) => {
    try {
      set({ isLoading: true });
      const data = await fetchCompleteData(pid);
      const updatedTodos = get().todos.filter((todo) => {
        if (todo.public_id !== pid) return todo;
        todo.completed = !todo.completed;
        return todo;
      });
      set({ isLoading: false, todos: updatedTodos });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  clearTodos: async () => {
    try {
      set({ isLoading: true });
      await fetchClearData();
      set({ isLoading: false, todos: [] }); // get().todos.splice(0)
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  updateTodos: (todo: Todo) => set({}),
}));

async function fetchData() {
  const fetchResponse = await fetch("http://localhost:5050/todos");
  const jsonData: FetchResponse<Todo[]> = await fetchResponse.json();
  const todos = jsonData.data;
  console.log(todos);

  return todos;
}

async function fetchPostData(todo: Todo) {
  const response = await fetch("http://localhost:5050/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const jsonData: FetchResponse<Todo> = await response.json();
  const newTodo = jsonData.data;
  console.log(jsonData);

  return newTodo;
}

async function fetchDeleteData(pid: typeof v4) {
  const response = await fetch(`http://localhost:5050/todos/${pid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonData: FetchResponse<ServerResponse> = await response.json();
  const { data } = jsonData;
  console.log(jsonData);

  return data;
}

async function fetchCompleteData(pid: typeof v4) {
  const response = await fetch(`http://localhost:5050/todos/${pid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonData: FetchResponse<ServerResponse> = await response.json();
  const { data } = jsonData;
  console.log(jsonData);

  return data;
}

async function fetchClearData() {
  const fetchResponse = await fetch("http://localhost:5050/todos/clear", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonData: FetchResponse<{ message: string }> =
    await fetchResponse.json();
  const { data } = jsonData;
  console.log(jsonData);

  return data;
}
