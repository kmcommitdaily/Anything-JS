const fs = require('fs'); // import file system

// reading files: readFile(directory, function with two parameter(err and data))
// asynchronous
fs.readFile('./docs/blog1.txt', (err, data) => {
  if (err) {
    // console.log(err);
  }
  // console.log(data.toString()); //without toString() method this will return a buffer(just a package of data sent to us)
});

// writing files: writeFile(directoy, content you wanna replace with, function)
fs.writeFile('./docs/blog1.txt', 'I changed the content of my file', () => {
  // console.log('Blog is changed');
});
fs.writeFile('./docs/blog2.txt', 'I added new blog', () => {
  // console.log('Blog is changed'); // this directory does not exist but it won't throw an error and will make a directory instead
});

// directories
if (!fs.existsSync('./assets')) {
  // conditionally render this so it will only process the code if the file does not exist yet
  fs.mkdir('./assets', (err) => {
    if (err) {
      console.log(err);
    }

    console.log('folder added');
  });
} else {
  fs.rmdir('./assets', (err) => {
    if (err) {
      console.log(err);
    }

    console.log('folder removed');
  });
}

// deleting files
if (fs.existsSync('./docs/deleteme.txt')) {
  fs.unlink('./docs/deleteme.txt', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('file deleted');
  });
}
