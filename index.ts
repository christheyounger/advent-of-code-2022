import { readFileSync } from "fs";
import path from "path";
import { part1, part2 } from "./day2";

const input = readFileSync(path.join(__dirname, 'day2.txt')).toString().trim();

console.log(part1(input))
console.log(part2(input))
