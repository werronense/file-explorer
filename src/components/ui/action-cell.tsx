import { File, Folder } from "@/definitions/file-tree";
import {
  TrashIcon,
  CodeBracketSquareIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export const ActionCell = ({ file }: { file: File | Folder }) => {
  return (
    <td className="text-right">
      {!("files" in file) && (
        <>
          <ChartBarIcon className="size-5 inline align-text-top mr-2" />
          <CodeBracketSquareIcon className="size-5 inline align-text-top mr-2" />
        </>
      )}
      <TrashIcon className="size-5 inline align-text-top text-red-600" />
    </td>
  );
};
