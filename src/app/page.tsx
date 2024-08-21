"use client";

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
import { useState } from "react";
import { files } from "@/data/file-data";

type File = {
  id: string;
  name: string;
  status?: string;
  fileType: string;
};

type Folder = {
  id: string;
  name: string;
  files: Array<File | Folder>;
};

const flattenFileTree = (
  tree: Array<File | Folder>,
  level: number
): Array<[number, File | Folder]> => {
  const flattened: Array<[number, File | Folder]> = [];

  tree.forEach((row) => {
    flattened.push([level, row]);

    if ("files" in row) {
      flattened.push(...flattenFileTree(row.files, level + 1));
    }
  });

  return flattened;
};

export default function Home() {
  const [fileTree, setFileTree] = useState(files);

  const tableRows = flattenFileTree(fileTree, 1);

  return (
    <main className="max-w-3xl mx-auto mt-4">
      <div className="flex justify-between">
        <h1>Pipelines</h1>
        <button type="button">Create Pipeline</button>
      </div>
      <table className="text-left mt-4 w-full">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map(([level, row]) => (
            <tr key={row.id}>
              <th scope="row" className={`pl-${4 * (level - 1)}`}>
                {"files" in row && (
                  <FolderIcon className="size-5 inline align-text-top mr-2" />
                )}
                {"fileType" in row &&
                  ((row.fileType === "ingestion" && (
                    <ArrowRightEndOnRectangleIcon className="size-5 inline align-text-top mr-2" />
                  )) ||
                    (row.fileType === "retrieval" && (
                      <ArrowLeftStartOnRectangleIcon className="size-5 inline align-text-top mr-2" />
                    )) ||
                    (row.fileType === "code" && (
                      <CodeBracketIcon className="size-5 inline align-text-top mr-2" />
                    )))}
                {row.name}
              </th>
              {"status" in row ? (
                <td className="capitalize">
                  {(row.status === "healthy" && (
                    <CheckCircleIcon className="size-5 inline align-text-top mr-2 text-green-600" />
                  )) ||
                    (row.status === "unknown" && (
                      <ExclamationCircleIcon className="size-5 inline align-text-top mr-2 text-amber-600" />
                    )) ||
                    (row.status === "unhealthy" && (
                      <XCircleIcon className="size-5 inline align-text-top mr-2 text-red-600" />
                    ))}
                  {row.status}
                </td>
              ) : (
                <td></td>
              )}
              <td className="text-right">
                {!("files" in row) && (
                  <>
                    <ChartBarIcon className="size-5 inline align-text-top mr-2" />
                    <CodeBracketSquareIcon className="size-5 inline align-text-top mr-2" />
                  </>
                )}
                <TrashIcon className="size-5 inline align-text-top text-red-600" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
