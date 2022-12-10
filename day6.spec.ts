import { scan } from "./day6";

describe("day 6", () => {
  test("part1", () => {
    expect(scan("nppdvjthqldpwncqszvftbrmjlhg", 4)).toEqual(6);
  });
  test("part2", () => {
    expect(scan(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`, 14)).toEqual(19);
  });
});
