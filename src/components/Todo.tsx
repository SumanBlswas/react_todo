import React from "react";
import { formatDistanceToNow } from "date-fns";

interface TodoProps {
  todo: string;
  completed: boolean;
  timestamp: number;
  onClick: () => void;
  removeTodo: (id: number) => void;
  undoCompleted: (id: number) => void;
  id: number;
}

const Todo: React.FC<TodoProps> = ({
  todo,
  completed,
  timestamp,
  onClick,
  removeTodo,
  undoCompleted,
  id,
}) => {
  const handleCardClick = () => {
    if (!completed) {
      onClick();
    }
  };

  return (
    <div
      className={`relative p-4 border rounded-lg mb-4 cursor-pointer ${
        completed ? "bg-gray-200 text-gray-500" : "bg-white"
      }`}
      onClick={handleCardClick}
    >
      {!completed && (
        <div className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
      )}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className={`flex-grow ${completed ? "line-through" : ""}`}>
          <p className="text-lg font-semibold">{todo}</p>
          <p className="text-sm text-gray-500">
            Created {formatDistanceToNow(timestamp)} ago
          </p>
        </div>
        {completed && (
          <div className="text-green-500 font-mono text-lg font-black flex gap-3 flex-wrap">
            <p onClick={() => undoCompleted(id)}>Completed</p>
            <p className={"text-red-500"} onClick={() => removeTodo(id)}>
              Remove
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
