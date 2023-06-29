const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const treeData = require('./temptree');

const port = 3000;

let directories = [];


app.get('/files', (req, res) => {
  if(directories) {
    const query = req.query.q;
    if (!query) {
      res.json(directories);
    }
    else {
      res.json(getMatchingDirectories(directories,query));
    }

  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  readJSON();
});

function readJSON() {
  treeData.forEach(directory => directories.push(convertToDirectory(directory)));
}

function convertToDirectory(data) {
  const directory = { 
    name:data.name,
    files: data.files,
    directories: []
  }
 
  if (data.directories && data.directories.length > 0) {
    directory.directories = data.directories.flatMap(subDirectories =>
      subDirectories.map(subDirectory => convertToDirectory(subDirectory))
    );
  }

  return directory
}
function getMatchingDirectories(directories, prefix){
  const result = [];
  for (const node of directories) {
    const { name, files, directories } = node;
    const matchedFiles = files.filter(file => file.toLowerCase().startsWith(prefix.toLowerCase()));
    console.log(matchedFiles);
    if (matchedFiles.length > 0) {
      result.push({ name, files: matchedFiles, directories: [] });
    }
    else if (name.toLowerCase().startsWith(prefix.toLowerCase())) {
        result.push({ name, files: [], directories: [] });
    } 
    
    if (directories.length > 0) {
      const matchedDirectories = getMatchingDirectories(directories, prefix);
      if (matchedDirectories.length > 0) {
        result.push({ name, files: [], directories: matchedDirectories });
      }
    }
  }
  return result;
}