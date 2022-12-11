import { readFileSync } from "fs";
import path from "path";
import { part1 } from "./day9";

const input = readFileSync(path.join(__dirname, "day9.txt")).toString().trim();

console.log(part1(input));
console.log(part1(input, 10));
