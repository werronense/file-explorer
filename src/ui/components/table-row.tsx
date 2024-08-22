import { File, Folder } from "@/definitions/file-tree";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  FolderIcon,
  CodeBracketIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  TrashIcon,
  CodeBracketSquareIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

type TableRowProps = {
  level: number;
  file: File | Folder;
};

export const TableRow = ({ level, file }: TableRowProps) => {
  return (
    <tr>
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
      {"status" in file ? (
        <td className="capitalize">
          {(file.status === "healthy" && (
            <CheckCircleIcon className="size-5 inline align-text-top mr-2 text-green-600" />
          )) ||
            (file.status === "unknown" && (
              <ExclamationCircleIcon className="size-5 inline align-text-top mr-2 text-amber-600" />
            )) ||
            (file.status === "unhealthy" && (
              <XCircleIcon className="size-5 inline align-text-top mr-2 text-red-600" />
            ))}
          {file.status}
        </td>
      ) : (
        <td></td>
      )}
      <td className="text-right">
        {!("files" in file) && (
          <>
            <ChartBarIcon className="size-5 inline align-text-top mr-2" />
            <CodeBracketSquareIcon className="size-5 inline align-text-top mr-2" />
          </>
        )}
        <TrashIcon className="size-5 inline align-text-top text-red-600" />
      </td>
    </tr>
  );
};
