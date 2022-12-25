type map = string[][];
type point = [number, number];

const maximum = (max: number, point: number) => Math.max(max, point);

const air = ".";
const sand = "o";
const rock = "#";
const sandCol = 500;
const left = 300;

const drawLine = (
  map: map,
  [startX, startY]: point,
  [endX, endY]: point
): void => {
  if (startX === endX) {
    for (
      let x = startX - left, y = Math.min(startY, endY);
      y <= Math.max(startY, endY);
      y++
    ) {
      map[y][x] = rock;
    }
  } else if (startY === endY) {
    for (
      let y = startY, x = Math.min(startX, endX) - left;
      x <= Math.max(startX, endX) - left;
      x++
    ) {
      map[y][x] = rock;
    }
  } else {
    throw new Error("not a straight line!!!!");
  }
};

const prepare = (input: string, floor = false): map => {
  const rocks: number[][][] = input
    .split("\n")
    .map((line) =>
      line
        .split(" -> ")
        .map((point) => point.split(",").map((val) => parseInt(val)))
    );
  const xMax =
    rocks
      .map((rock) => rock.map((point) => point[0] - 400).reduce(maximum, 0))
      .reduce(maximum) + left;
  const yMax =
    rocks
      .map((rock) => rock.map((point) => point[1]).reduce(maximum))
      .reduce(maximum) + 2;
  const map = Array(yMax)
    .fill(air)
    .map(() => Array(xMax).fill(air));
  rocks.forEach((points) => {
    for (let i = 1; i < points.length; i++) {
      const end = points[i],
        start = points[i - 1];
      drawLine(map, [start[0], start[1]], [end[0], end[1]]);
    }
  });
  if (floor) {
    map.push(Array(map[0].length).fill(rock));
  }
  return map;
};

const isEmpty = (map: map, [x, y]: point): boolean => {
  return y >= map.length || map[y]?.[x] === ".";
};

const nextMove = (map: map, [x, y]: point): point | null => {
  if (isEmpty(map, [x, y + 1])) return [x, y + 1];
  if (isEmpty(map, [x - 1, y + 1])) return [x - 1, y + 1];
  if (isEmpty(map, [x + 1, y + 1])) return [x + 1, y + 1];
  return null;
};

const applySand = (map: map): number => {
  for (let i = 0; i < 100000; i++) {
    let point: point = [sandCol - left, 0];
    let nextPoint: point | null = point;
    while ((nextPoint = nextMove(map, point))) {
      if (point[1] >= map.length) return i;
      point = nextPoint;
    }
    map[point[1]][point[0]] = sand;
    if (point[1] === 0) return i + 1;
  }
  throw new Error("Could not calculate");
};

export const part1 = (input: string): number => {
  const map = prepare(input);
  const i = applySand(map);
  console.log(map.map((line) => line.join("").slice(140, 300)).join("\n"));
  return i;
};

export const part2 = (input: string): number => {
  const map = prepare(input, true);
  const i = applySand(map);
  console.log(map.map((line) => line.join("").slice(140, 300)).join("\n"));
  return i;
};
