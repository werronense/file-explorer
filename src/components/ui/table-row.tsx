import { File, Folder } from "@/definitions/file-tree";
import { RowHeadCell } from "@/components/ui/row-head-cell";
import { StatusCell } from "@/components/ui/status-cell";
import { ActionCell } from "@/components/ui/action-cell";

type TableRowProps = {
  level: number;
  file: File | Folder;
  isEditable: boolean;
  handleSelect: (id: string) => void;
};

export const TableRow = ({ level, file, isEditable, handleSelect }: TableRowProps) => {
  return (
    <tr>
      <RowHeadCell level={level} file={file} renaming={isEditable} handleSelect={handleSelect} />
      {"status" in file ? <StatusCell status={file.status || ""} /> : <td></td>}
      <ActionCell file={file} />
    </tr>
  );
};
