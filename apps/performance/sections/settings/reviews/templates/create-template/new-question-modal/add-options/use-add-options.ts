import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface ReturnType {
  handleDeleteOption?: any;
  handleInputChange?: any;
  handlePushValues?: any;
  handleClose?: () => void;
  options: string[];
  setOptions: Dispatch<SetStateAction<[]>>;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  toggleInput: boolean;
  setToggleInput: Dispatch<SetStateAction<boolean>>;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export function useAddOptions({ options, setOptions }): ReturnType {
  const [toggleInput, setToggleInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleDeleteOption = (index: number): void => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleInputChange = ({ target }): void => {
    const { value } = target;
    setInputValue(value);
  };

  const handlePushValues = (): void => {
    if (inputValue.trim() !== "") {
      setOptions([...options, inputValue.trim()]);
      setToggleInput(false);
      setInputValue(""); 
    }
  };
  const handleClose = (): void => {
    setToggleInput(false);
    setInputValue("");
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      handlePushValues();
    }
  };

  return {
    options,
    setOptions,
    toggleInput,
    setToggleInput,
    inputValue,
    setInputValue,
    handleDeleteOption,
    handleInputChange,
    handlePushValues,
    handleClose,
    handleKeyDown
  };
}
