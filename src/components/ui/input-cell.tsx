import { FormEvent, useState, useRef } from "react";

type InputCellProps = {
  name: string;
  id: string;
  renaming: boolean;
  handleDeselect: () => void;
  handleFileNameChange: (id: string, updatedName: string) => void;
};

export const InputCell = ({
  name,
  id,
  renaming,
  handleDeselect,
  handleFileNameChange,
}: InputCellProps) => {
  const [value, setValue] = useState(name);
  const ref = useRef<HTMLInputElement>(null!);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setValue(name);
      ref.current.blur();
      handleDeselect();
    } else if (e.key === "Enter") {
      handleFileNameChange(ref.current.id, ref.current.value);
      ref.current.blur();
      handleDeselect();
    }
  };

  return (
    <input
      type="text"
      id={id}
      value={value}
      onChange={handleInputChange}
      onKeyUp={handleKeyUp}
      readOnly={!renaming}
      ref={ref}
    />
  );
};
