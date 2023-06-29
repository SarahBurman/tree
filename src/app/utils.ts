export interface Directory {
    name: string,
    files: string[],
    directories: Directory[]
}

export interface DirectoryNode {
    name: string;
    files?:string[];
    children?: DirectoryNode[];
}

export function convertToTree(data: Directory[]): DirectoryNode[] {
  
    const createNode = (directory: Directory): DirectoryNode => {
      const node: DirectoryNode = { name: directory.name,files:directory.files, children: [] };
  
      if (directory.directories) {
        directory.directories.forEach(child => {
          const childNode = createNode(child);
          node.children?.push(childNode);
        });
      }
  
      // if (directory.files && directory.files.length > 0) {
      //   // Add file nodes under the parent node (optional, based on your requirement)
      //   node.children?.push(...directory.files.map(file => ({ name: file })));
      // }
  
      return node;
    };
  
    // const treeData = createNode(data);
    const treeData = data.map(directory => createNode(directory));
    return treeData;
  };