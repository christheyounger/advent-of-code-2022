import { readFileSync } from "fs";
import path from "path";
import { part1, part2 } from "./day15";

const input = readFileSync(path.join(__dirname, "day15.txt")).toString().trim();

console.log(part1(input, 2000000));
console.log(part2(input, 4000000));
