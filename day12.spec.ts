import { part1, part2 } from "./day12";

const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

describe("day 12", () => {
  test("part1", () => {
    expect(part1(input)).toEqual(31);
  });
  test("part2", () => {
    expect(part2(input)).toEqual(29);
  });
});
