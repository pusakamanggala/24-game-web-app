import { useState } from "react";
import clickSound from "../audio/punchy-taps-ui-2.mp3";
import ConfirmationModal from "./ConfirmationModal";

export default function Keyboard({
  input,
  setInput,
  onSubmit,
  onGiveUp,
}: {
  input: string[];
  setInput: React.Dispatch<React.SetStateAction<string[]>>;
  onSubmit: () => void;
  onGiveUp: () => void;
}) {
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.volume = 0.2;

    audio.play();
  };

  const handleInputOperator = (value: string) => {
    const operator = ["+", "-", "*", "/"];

    playClickSound();

    // operator cant be side by side
    if (
      input.length > 0 &&
      operator.includes(input[input.length - 1]) &&
      operator.includes(value)
    )
      return;

    // only opening parenthesis can be at first
    if (input.length === 0 && value !== "(") return;
    else {
      setInput([...input, value]);
    }

    // only closing parenthesis can be at last
    if (input.length > 0 && value === ")" && input[input.length - 1] !== "(")
      return;
    else {
      setInput([...input, value]);
    }
  };

  const handleDelete = () => {
    playClickSound();

    if (input.length === 0) return;
    setInput(input.slice(0, -1));
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirm = () => {
    setModalOpen(true);
  };

  return (
    <div className="flex flex-row gap-2 w-fit">
      <div className="grid grid-cols-4 col-span-4 gap-2 mx-auto w-fit">
        <button
          className="keyboard"
          onClick={() => handleInputOperator("*")}
          type="button"
          title="Multiply"
        >
          <p>x</p>
        </button>
        <button
          className="keyboard"
          onClick={() => handleInputOperator("/")}
          type="button"
          title="Divide"
        >
          <p>÷</p>
        </button>

        <button
          className="keyboard"
          onClick={() => handleInputOperator("+")}
          type="button"
          title="Add"
        >
          <p>+</p>
        </button>

        <button
          className="keyboard"
          onClick={() => handleInputOperator("-")}
          type="button"
          title="Subtract"
        >
          <p>-</p>
        </button>

        <button
          className="keyboard"
          onClick={() => handleInputOperator("(")}
          type="button"
          title="Open parenthesis"
        >
          <p>(</p>
        </button>
        <button
          className="keyboard"
          onClick={() => handleInputOperator(")")}
          type="button"
          title="Close parenthesis"
        >
          <p>)</p>
        </button>
        <button
          className="h-10 col-span-2 primary-button"
          onClick={onSubmit}
          type="button"
          title="Submit"
        >
          Submit
        </button>
        <button
          onClick={handleConfirm}
          className="!w-full col-span-4 primary-button h-10 bg-primary text-secondary dark:bg-secondary dark:text-primary hover:bg-red-500 dark:hover:bg-red-500 give-up-button"
          type="button"
          title="Give up"
        >
          Give up
        </button>
      </div>
      <button
        className="primary-button"
        onClick={handleDelete}
        type="button"
        title="Delete"
      >
        Del
      </button>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={onGiveUp}
        title="Confirmation"
      >
        <p className="font-medium">Are you sure you want to give up?</p>
        <p className="leading-tight">
          Sometimes it's okay to give up, look the other way and find another
          path.
        </p>
      </ConfirmationModal>
    </div>
  );
}
