import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import ResetButton from "./components/ResetButton";

interface TodoItem {
  id: number;
  todo: string;
  completed: boolean;
  timestamp: number;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  let nextTodoId = parseInt(localStorage.getItem("nextTodoId") || "1", 10);

  const addTodo = (todo: string) => {
    const newTodoItem: TodoItem = {
      id: nextTodoId++,
      todo,
      completed: false,
      timestamp: Date.now(),
    };
    const updatedTodos = [...todos, newTodoItem];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    localStorage.setItem("nextTodoId", nextTodoId.toString());
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = [...todos];
    const todoIndex = updatedTodos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      updatedTodos[todoIndex].completed = !updatedTodos[todoIndex].completed;
      if (updatedTodos[todoIndex].completed) {
        updatedTodos[todoIndex].timestamp = Date.now();
      }
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const resetTodos = () => {
    setTodos([]);
    localStorage.removeItem("todos");
    localStorage.removeItem("nextTodoId");
  };

  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const undoCompleted = (id: number) => {
    const updatedTodos = [...todos];
    const todoIndex = updatedTodos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      updatedTodos[todoIndex].completed = false;
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  return (
    <div className="container mx-auto p-10 pr-24 pl-24">
      <div
        className={
          "flex justify-center place-items-center mb-8 items-center md:justify-between flex-wrap"
        }
      >
        <h1 className="text-3xl font-bold mx-3">TODO App</h1>
        {todos.length > 0 ? (
          <div className="mt-4 flex justify-center font-mono font-bold text-base">
            {todos.length > 0 && <ResetButton onReset={resetTodos} />}
          </div>
        ) : (
          ""
        )}
      </div>
      <TodoInput onAddTodo={addTodo} />
      {todos.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">TODO List :</h2>
          <TodoList
            todos={todos}
            onTodoClick={toggleTodo}
            removeTodo={removeTodo}
            undoCompleted={undoCompleted}
          />
        </>
      ) : (
        <p className="text-gray-500">No TODOs yet.</p>
      )}
    </div>
  );
};

export default App;
