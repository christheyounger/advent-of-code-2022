import { part1, part2 } from "./day14";

const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

describe("day 14", () => {
  test("part1", () => {
    expect(part1(input)).toEqual(24);
  });
  test("part2", () => {
    expect(part2(input)).toEqual(93);
  });
});
