import { readFileSync } from "fs";
import path from "path";
import { scan } from "./day6";

const input = readFileSync(path.join(__dirname, "day6.txt")).toString().trim();

console.log(scan(input, 4));
console.log(scan(input, 14));
