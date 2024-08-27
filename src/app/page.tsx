"use client";

import { useState } from "react";
import { FileTree, FlatFileTree } from "@/definitions/file-tree";
import { TableRow } from "@/components/ui/table-row";
import { files } from "@/data/file-data";

const flattenFileTree = (tree: FileTree, level: number): FlatFileTree => {
  const flattened: FlatFileTree = [];

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
  const [selectedFileId, setSelectedFileId] = useState("");
  
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
          {tableRows.map(([level, file]) => (
            <TableRow
              key={file.id}
              level={level}
              file={file}
              isEditable={selectedFileId === file.id}
              handleSelect={setSelectedFileId}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
