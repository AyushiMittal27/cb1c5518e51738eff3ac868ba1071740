const fs = require("fs");
const request = require("request");
const extract = require("extract-zip");

const downloadZipFile = async (url, dest) => {
  // Create an empty file where we can save data //
  const file = fs.createWriteStream(dest);
  console.log(dest, "destination");

  await new Promise((resolve, reject) => {
    request({
      // exact link to the file you are trying to download //
      uri: url,
      gzip: true,
    })
      .pipe(file)
      .on("finish", async () => {
        console.log(`The file is finished downloading.`);
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  }).catch((error) => {
    console.log(`Something happened: ${error}`);
  });
};

const extractFile = async (source, destination) => {
  try {
    await extract(source, { dir: destination });
    console.log("Extraction of the file completed");
  } catch (err) {
    console.log("Something happened:" + err);
  }
};

const copyFile = async (source, destination) => {
  var rd = fs.createReadStream(source);
  var wr = fs.createWriteStream(destination);
  try {
    return await new Promise((resolve, reject) => {
      rd.on("error", reject);
      wr.on("error", reject);
      wr.on("finish", resolve);
      rd.pipe(wr);
    });
  } catch (err) {
    console.log("Something happend:  ${err}");
  }
};

module.exports = { downloadZipFile, extractFile, copyFile };
