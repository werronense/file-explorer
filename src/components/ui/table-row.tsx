import { File, Folder } from "@/definitions/file-tree";
import { RowHeadCell } from "@/components/ui/row-head-cell";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
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
      <RowHeadCell level={level} file={file} />
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
