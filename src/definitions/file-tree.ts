export type FileTree = Array<File | Folder>;

export type FlatFileTree = Array<[number, File | Folder]>;

export type File = {
  id: string;
  name: string;
  status?: string;
  fileType: string;
};

export type Folder = {
  id: string;
  name: string;
  files: FileTree;
};
