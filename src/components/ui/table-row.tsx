import { File, Folder } from "@/definitions/file-tree";
import { RowHeadCell } from "@/components/ui/row-head-cell";
import { StatusCell } from "@/components/ui/status-cell";
import { ActionCell } from "@/components/ui/action-cell";

type TableRowProps = {
  level: number;
  file: File | Folder;
  isEditable: boolean;
  handleSelect: (id: string) => void;
  handleFileNameChange: (id: string, updatedName: string) => void;
  handleFileMove: (fileId: string, folderId: string) => void;
};

export const TableRow = ({
  level,
  file,
  isEditable,
  handleSelect,
  handleFileNameChange,
  handleFileMove,
}: TableRowProps) => {
  const isFile = "fileType" in file;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");

    handleFileMove(data, e.currentTarget.id);
  }

  return (isFile ?
    (<tr id={file.id} draggable={true} onDragStart={handleDragStart}>
      <RowHeadCell
        level={level}
        file={file}
        renaming={isEditable}
        handleSelect={handleSelect}
        handleFileNameChange={handleFileNameChange}
      />
      {"status" in file ? <StatusCell status={file.status || ""} /> : <td></td>}
      <ActionCell file={file} />
    </tr>) :
    (<tr id={file.id} onDragOver={handleDragOver} onDrop={handleDrop}>
      <RowHeadCell
        level={level}
        file={file}
        renaming={isEditable}
        handleSelect={handleSelect}
        handleFileNameChange={handleFileNameChange}
      />
      <td></td>
      <ActionCell file={file} />
    </tr>)
  );
};
