import { type ChangeEvent, useState, type Dispatch, type SetStateAction } from "react";

interface ReturnTypes {
  discussionPoint: string;
  setDiscussionPoint: Dispatch<SetStateAction<string>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

export default function useAddDiscussionModal(): ReturnTypes {
  const [discussionPoint, setDiscussionPoint] = useState<string>("");

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setDiscussionPoint(e.target.value);
  }

  function handleSubmit(): void {
    setDiscussionPoint("");
  }

  return { discussionPoint, setDiscussionPoint, handleChange, handleSubmit };
}
