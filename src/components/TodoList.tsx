import React from "react";
import Todo from "./Todo";

interface TodoListProps {
  todos: { id: number; todo: string; completed: boolean; timestamp: number }[];
  onTodoClick: (id: number) => void;
  removeTodo: (id: number) => void;
  undoCompleted: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onTodoClick,
  removeTodo,
  undoCompleted,
}) => {
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) {
      if (a.completed) {
        return b.timestamp - a.timestamp;
      }
      return b.timestamp - a.timestamp;
    }
    return a.completed ? 1 : -1;
  });

  return (
    <div>
      {sortedTodos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          todo={todo.todo}
          completed={todo.completed}
          timestamp={todo.timestamp}
          removeTodo={removeTodo}
          undoCompleted={undoCompleted}
          onClick={() => onTodoClick(todo.id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
