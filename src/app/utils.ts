export interface Directory {
    name: string,
    files: string[],
    directories: Directory[]
}

export interface DirectoryNode {
    name: string;
    children?: DirectoryNode[];
}

export function convertToTree(data: Directory): DirectoryNode{
  
    const createNode = (directory: Directory): DirectoryNode => {
      const node: DirectoryNode = { name: directory.name, children: [] };
  
      if (directory.directories) {
        directory.directories.forEach(child => {
          const childNode = createNode(child);
          node.children?.push(childNode);
        });
      }
  
      if (directory.files && directory.files.length > 0) {
        // Add file nodes under the parent node (optional, based on your requirement)
        node.children?.push(...directory.files.map(file => ({ name: file })));
      }
  
      return node;
    };
  
    const treeData = createNode(data);
  
    return treeData;
  };