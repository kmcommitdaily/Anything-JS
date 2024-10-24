const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {
  encoding: 'utf8',
});

const writeStream = fs.createWriteStream('./docs/blog4.txt');

// readStream.on('data', (chunk) => {
//   console.log(' --- NEW DATA ---');
//   console.log(chunk);

//   writeStream.write('\nNEW CHUNK\n');
//   writeStream.write(chunk);
// });

readStream.pipe(writeStream); //shorter version

// This means that as data is read from blog3.txt, it is simultaneously written to blog4.txt. This is done in chunks, which is efficient for handling large files without consuming too much memory.
