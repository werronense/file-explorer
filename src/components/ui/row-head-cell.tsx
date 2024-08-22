import { File, Folder } from "@/definitions/file-tree";
import {
  FolderIcon,
  CodeBracketIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

type RowHeadCellProps = {
  level: number;
  file: File | Folder;
};

export const RowHeadCell = ({ level, file }: RowHeadCellProps) => {
  return (
    <th scope="row" className={`pl-${4 * (level - 1)}`}>
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
    </th>
  );
};
