import { FormEvent, useState, useRef } from "react";

type InputCellProps = {
  name: string;
  renaming: boolean;
  handleDeselect: () => void;
};

export const InputCell = ({
  name,
  renaming,
  handleDeselect,
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
      ref.current.blur();
      handleDeselect();
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      onKeyUp={handleKeyUp}
      readOnly={!renaming}
      ref={ref}
    />
  );
};
