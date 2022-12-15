const csv = require("csvtojson");
const fs = require("fs");
const { pipeline } = require("stream");

const csvFilePath = "./task2/csv/nodejs-hw1-ex1.csv";
const txtFilePath = "./task2/txt/nodejs-hw1-ex1.txt";

pipeline(
  fs.createReadStream(csvFilePath),
  csv(),
  fs.createWriteStream(txtFilePath),
  (error) => {
    if (error) {
      console.error("Something went wrong:\n", error);
    } else {
      console.log("File processed successfully");
    }
  }
);
