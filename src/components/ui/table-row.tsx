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
  handleFileMove: (movedFile: File, folderId: string) => void;
  handleDeleteFile: (id: string) => void;
};

export const TableRow = ({
  level,
  file,
  isEditable,
  handleSelect,
  handleFileNameChange,
  handleFileMove,
  handleDeleteFile,
}: TableRowProps) => {
  const isFile = "fileType" in file;

  const handleDragStart = (e: React.DragEvent, fileData: File) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(fileData));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const { id } = e.currentTarget;
    const data = e.dataTransfer.getData("text/plain");
    const draggedFile = JSON.parse(data);

    if (
      "files" in file &&
      !file.files.some((file) => file.id === draggedFile.id)
    ) {
      handleFileMove(draggedFile, id);
    }
  };

  return isFile ? (
    <tr
      id={file.id}
      draggable={true}
      onDragStart={(e) => handleDragStart(e, file)}
    >
      <RowHeadCell
        level={level}
        file={file}
        renaming={isEditable}
        handleSelect={handleSelect}
        handleFileNameChange={handleFileNameChange}
        handleDeleteFile={handleDeleteFile}
      />
      {"status" in file ? <StatusCell status={file.status || ""} /> : <td></td>}
      <ActionCell file={file} />
    </tr>
  ) : (
    <tr id={file.id} onDragOver={handleDragOver} onDrop={handleDrop}>
      <RowHeadCell
        level={level}
        file={file}
        renaming={isEditable}
        handleSelect={handleSelect}
        handleFileNameChange={handleFileNameChange}
        handleDeleteFile={handleDeleteFile}
      />
      <td></td>
      <ActionCell file={file} />
    </tr>
  );
};
