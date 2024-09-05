import { File, Folder } from "@/definitions/file-tree";
import {
  FolderIcon,
  CodeBracketIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { InputCell } from "@/components/ui/input-cell";

type RowHeadCellProps = {
  level: number;
  file: File | Folder;
  renaming: boolean;
  handleSelect: (id: string) => void;
  handleFileNameChange: (id: string, updatedName: string) => void;
};

export const RowHeadCell = ({
  level,
  file,
  renaming,
  handleSelect,
  handleFileNameChange,
}: RowHeadCellProps) => {
  return (
    <th scope="row" style={{ paddingLeft: `${level - 1}rem` }}>
      <ContextMenu>
        <ContextMenuTrigger>
          {"files" in file && (
            <FolderIcon className="size-5 inline align-text-top mr-2" />
          )}
          {"fileType" in file &&
            ((file.fileType === "ingestion" && (
              <ArrowRightEndOnRectangleIcon className="size-5 inline align-text-top mr-2" />
            )) ||
              (file.fileType === "retrieval" && (
                <ArrowLeftStartOnRectangleIcon className="size-5 inline align-text-top mr-2" />
              )) ||
              (file.fileType === "code" && (
                <CodeBracketIcon className="size-5 inline align-text-top mr-2" />
              )))}
          <InputCell
            name={file.name}
            id={file.id}
            renaming={renaming}
            handleDeselect={() => handleSelect("")}
            handleFileNameChange={handleFileNameChange}
          />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => handleSelect(file.id)}>
            Rename
          </ContextMenuItem>
          <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </th>
  );
};
