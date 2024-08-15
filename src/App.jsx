import { useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import { useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((oldTodo) => [{ id: Date.now(), ...todo }, ...oldTodo]);
  };

  //33mins
  const updateTodo = (id, todo) => {
    setTodos((oldTodoArr) =>
      oldTodoArr.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((oldTodoArr) => oldTodoArr.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((oldTodoArr) =>
      oldTodoArr.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todosLocal"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("todosLocal", JSON.stringify(todos));
  }, [todos]);


  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">{/* Todo form goes here */}

            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>
            (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo}/>

              </div>
            )
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}
