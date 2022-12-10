import { readFileSync } from "fs";
import path from "path";
import { part1, part2 } from "./day1";

const input = readFileSync(path.join(__dirname, 'day1.txt')).toString().trim();

console.log(part1(input))
console.log(part2(input))
