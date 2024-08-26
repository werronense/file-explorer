import { FormEvent, useState } from "react";

type InputCellProps = {
  name: string;
  renaming: boolean;
}

export const InputCell = ({ name, renaming }: InputCellProps) => {
  const [value, setValue] = useState(name);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => handleInputChange(e)}
      readOnly={!renaming}
    />
  );
};
