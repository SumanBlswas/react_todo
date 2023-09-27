import React, { useState } from "react";

interface TodoInputProps {
  onAddTodo: (todo: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      onAddTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <div className="flex items-center mb-4 flex-wrap justify-center gap-3">
      <input
        type="text"
        className="p-3 border rounded-lg flex-grow"
        placeholder="Add a new TODO"
        value={newTodo}
        onChange={handleInputChange}
      />
      <button
        className="p-3 bg-blue-500 text-white rounded-lg"
        onClick={handleAddTodo}
      >
        Return
      </button>
    </div>
  );
};

export default TodoInput;
