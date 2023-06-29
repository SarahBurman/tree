const express = require('express');
const cors = require('cors');
const treeData = require('./tree');

const port = 3000;
const app = express();

let directories = treeData.map(directory => convertToFlattenDirectory(directory));

app.use(cors());

app.get('/files', (req, res) => {
    const prefix = req.query.q;
    
    if (!prefix) {
      res.json(directories);
      return;
    }

    res.json(getMatchingDirectories(directories,prefix));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});


function convertToFlattenDirectory(directory) {
  const root = { 
    name:directory.name,
    files: directory.files,
    directories: []
  }
 
  if (directory.directories?.length > 0) {
    root.directories = directory.directories.flatMap(subDirectories =>
      subDirectories.map(subDirectory => convertToFlattenDirectory(subDirectory))
    );
  }

  return root;
}

function getMatchingDirectories(directories, prefix) {
  const result = [];
  
  for (const node of directories) {
    const { name, files, directories } = node;
    const matchedFiles = files.filter(file => file.toLowerCase().startsWith(prefix.toLowerCase()));
    let matchedDirectories = [];

    if (directories.length > 0) {
      matchedDirectories = getMatchingDirectories(directories, prefix);
    }

    if(matchedFiles.length > 0 || name.toLowerCase().startsWith(prefix.toLowerCase()) || matchedDirectories.length > 0){
      result.push({ name, files: matchedFiles, directories: matchedDirectories });
    }
  }

  return result;
}