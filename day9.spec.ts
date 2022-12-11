import { part1 } from "./day9";

const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const input2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

describe("day 9", () => {
  test("part1", () => {
    expect(part1(input)).toEqual(13);
  });
  test("part2", () => {
    expect(part1(input, 9)).toEqual(1);
  });
  test("part2", () => {
    expect(part1(input2, 10)).toEqual(36);
  });
});
