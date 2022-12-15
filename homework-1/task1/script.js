import { createInterface } from "node:readline";
import { stdin as input, stdout as output } from "node:process";

const rl = createInterface({ input, output });

rl.on("line", (input) => {
  console.log(input.split("").reverse().join(""));
});
