"use client";

import { useEffect, useState } from "react";
import { FileTree, FlatFileTree, File } from "@/definitions/file-tree";
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
  const [fileTree, setFileTree] = useState<FileTree>([]);
  const [selectedFileId, setSelectedFileId] = useState("");

  const tableRows = flattenFileTree(fileTree, 1);

  const copyFileTree = () => JSON.parse(JSON.stringify(fileTree));

  const postData = async (
    files: FileTree,
    endpoint: string
  ): Promise<FileTree> => {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(files),
    });

    return await response.json();
  };

  const updateFileName = async (id: string, updatedName: string) => {
    const newFileTree = copyFileTree();

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

    findAndUpdateFile(newFileTree);

    const data = await postData(newFileTree, "/api");
    setFileTree(data);
  };

  const updateTreeStructure = async (movedFile: File, folderId: string) => {
    const newFileTree = copyFileTree();

    const filterFileTree = (files: FileTree, id: string): FileTree => {
      const fileIndex = files.findIndex((file) => file.id === id);

      if (fileIndex > -1) {
        return files.toSpliced(fileIndex, 1);
      } else {
        return files.map((file) => {
          if ("fileType" in file) {
            return file;
          } else {
            return { ...file, files: filterFileTree(file.files, id) };
          }
        });
      }
    };

    const insertFile = (files: FileTree, fileToInsert: File) => {
      files.forEach((file) => {
        if ("files" in file && file.id === folderId) {
          file.files.push(fileToInsert);
          return;
        } else if ("files" in file) {
          insertFile(file.files, fileToInsert);
        }
      });
    };

    const filteredFileTree = filterFileTree(newFileTree, movedFile.id);

    insertFile(filteredFileTree, movedFile);

    const data = await postData(filteredFileTree, "/api");

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
              handleFileMove={updateTreeStructure}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
