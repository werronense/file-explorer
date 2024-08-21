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
}

type Folder = {
  id: string;
  name: string;
  files: Array<File | Folder>;
}

const flattenFileTree = (tree: Array<File | Folder>, level: number): Array<[number, File | Folder]> => {
  const flattened: Array<[number, File | Folder]> = [];

  tree.forEach(row => {
    flattened.push([level, row]);
    
    if ("files" in row) {
      flattened.push(...flattenFileTree(row.files, level + 1));
    }
  });

  return flattened;
}

export default function Home() {
  const [fileTree, setFileTree] = useState(files);
  
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
          <tr>
            <th scope="row">
              <ArrowRightEndOnRectangleIcon className="size-5 inline align-text-top mr-2" />
              Meeting Transcriptions
            </th>
            <td>
              <CheckCircleIcon className="size-5 inline align-text-top mr-2 text-green-600" />
              Healthy
            </td>
            <td className="text-right">
              <ChartBarIcon className="size-5 inline align-text-top mr-2" />
              <CodeBracketSquareIcon className="size-5 inline align-text-top mr-2" />
              <TrashIcon className="size-5 inline align-text-top text-red-600" />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <FolderIcon className="size-5 inline align-text-top mr-2" />
              Task Management
            </th>
            <td></td>
            <td className="text-right">
              <TrashIcon className="size-5 inline align-text-top text-red-600" />
            </td>
          </tr>
          <tr>
            <th scope="row" className="pl-4">
              <ArrowRightEndOnRectangleIcon className="size-5 inline align-text-top mr-2" />
              Capture Notes
            </th>
            <td>
              <ExclamationCircleIcon className="size-5 inline align-text-top mr-2 text-amber-600" />
              Unknown
            </td>
            <td className="text-right">
              <ChartBarIcon className="size-5 inline align-text-top mr-2" />
              <CodeBracketSquareIcon className="size-5 inline align-text-top mr-2" />
              <TrashIcon className="size-5 inline align-text-top text-red-600" />
            </td>
          </tr>
          <tr>
            <th scope="row" className="pl-4">
              <ArrowLeftStartOnRectangleIcon className="size-5 inline align-text-top mr-2" />
              Task Enrichment
            </th>
            <td>
              <XCircleIcon className="size-5 inline align-text-top mr-2 text-red-600" />
              Unhealthy
            </td>
            <td className="text-right">
              <ChartBarIcon className="size-5 inline align-text-top mr-2" />
              <CodeBracketSquareIcon className="size-5 inline align-text-top mr-2" />
              <TrashIcon className="size-5 inline align-text-top text-red-600" />
            </td>
          </tr>
          <tr>
            <th scope="row" className="pl-4">
              <FolderIcon className="size-5 inline align-text-top mr-2" />
              Utilities
            </th>
            <td></td>
            <td className="text-right">
              <TrashIcon className="size-5 inline align-text-top text-red-600" />
            </td>
          </tr>
          <tr>
            <th scope="row" className="pl-8">
              <CodeBracketIcon className="size-5 inline align-text-top mr-2" />
              Task Lookup
            </th>
            <td></td>
            <td className="text-right">
              <ChartBarIcon className="size-5 inline align-text-top mr-2" />
              <CodeBracketSquareIcon className="size-5 inline align-text-top mr-2" />
              <TrashIcon className="size-5 inline align-text-top text-red-600" />
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
