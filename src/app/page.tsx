import Todos from "@/components/Todos";
import TodoInput from "@/components/TodoInput";
import TodoStats from "@/components/TodoStats";

export default async function Home() {
  return (
    <div className='container'>
      <TodoInput />
      <Todos />
      <TodoStats />
    </div>
  );
}
