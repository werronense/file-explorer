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
} from "@/components/ui/context-menu"

type RowHeadCellProps = {
  level: number;
  file: File | Folder;
};

export const RowHeadCell = ({ level, file }: RowHeadCellProps) => {
  return (
    <th scope="row" style={{ paddingLeft: `${level - 1}rem`}}>
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
          {file.name}
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Rename</ContextMenuItem>
          <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </th>
  );
};
