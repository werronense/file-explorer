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
  const [fileTree, setFileTree] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState("");

  const tableRows = flattenFileTree(fileTree, 1);

  const copyFileTree = () => JSON.parse(JSON.stringify(fileTree));

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

    const response = await fetch(`/api`, {
      method: "POST",
      body: JSON.stringify(newFileTree),
    });
    const data = await response.json();
    setFileTree(data);
  };

  const updateTreeStructure = async (fileId: string, folderId: string) => {
    const newFileTree = copyFileTree();

    const copyFile = (files: FileTree, id: string): File | undefined => {
      const flatFileTree = flattenFileTree(files, 1);
      const selected = flatFileTree.find(([_, file]) => {
        return "fileType" in file && file.id === id;
      });
      
      if (selected && "fileType" in selected[1]) {
        return selected[1];
      } else {
        return undefined;
      }
    };

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
    }

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

    const draggedFile = copyFile(newFileTree, fileId);

    if (draggedFile) {
      const filteredFileTree = filterFileTree(newFileTree, fileId);
      
      insertFile(filteredFileTree, draggedFile);

      const response = await fetch(`/api`, {
        method: "POST",
        body: JSON.stringify(filteredFileTree),
      });
      const data = await response.json();
      
      setFileTree(data);
    }
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
