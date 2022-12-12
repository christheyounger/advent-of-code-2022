import { readFileSync } from "fs";
import path from "path";
import { monkeyAbout } from "./day11";

const input = readFileSync(path.join(__dirname, "day11.txt")).toString().trim();

console.log(monkeyAbout(input));
console.log(monkeyAbout(input, false, 10000));
