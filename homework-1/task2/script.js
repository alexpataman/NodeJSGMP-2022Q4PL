import csv from "csvtojson";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream";

const csvFilePath = "./task2/csv/nodejs-hw1-ex1.csv";
const txtFilePath = "./task2/txt/nodejs-hw1-ex1.txt";

pipeline(
  createReadStream(csvFilePath),
  csv(),
  createWriteStream(txtFilePath),
  (error) => {
    if (error) {
      console.error("Something went wrong:\n", error);
    } else {
      console.log("File processed successfully");
    }
  }
);
