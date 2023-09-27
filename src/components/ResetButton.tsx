import React from "react";

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  return (
    <button
      className="p-10 pt-3 pb-3 bg-red-500 text-white rounded-lg"
      onClick={onReset}
    >
      Reset
    </button>
  );
};

export default ResetButton;
