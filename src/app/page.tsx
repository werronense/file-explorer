"use client";

import { useEffect, useState } from "react";
import { FileTree, FlatFileTree } from "@/definitions/file-tree";
import { TableRow } from "@/components/ui/table-row";

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
  const [fileTree, setFileTree] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState("");

  const tableRows = flattenFileTree(fileTree, 1);

  const updateFileName = async (id: string, updatedName: string) => {
    const updatedFileTree = JSON.parse(JSON.stringify(fileTree));

    const findAndUpdateFile = (files: FileTree) => {
      files.forEach((file) => {
        if (file.id === id) {
          file.name = updatedName;
          return;
        } else if ("files" in file) {
          findAndUpdateFile(file.files);
        }
      });
    };

    findAndUpdateFile(updatedFileTree);

    const response = await fetch(`/api`, {
      method: "POST",
      body: JSON.stringify(updatedFileTree),
    });
    const data = await response.json();
    setFileTree(data);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("/api");
      const data = await response.json();

      setFileTree(data);
    })();
  }, []);

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
              handleFileNameChange={updateFileName}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
