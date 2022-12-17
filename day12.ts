type Map = number[][];
type Coordinates = { x: number; y: number };
type Option = {
  x: number;
  y: number;
  dir: "^" | "<" | "v" | ">";
  step: number;
};

const prepare = (
  input: string
): { map: Map; start: Coordinates; end: Coordinates } => {
  let start: Coordinates = { x: 0, y: 0 };
  let end: Coordinates = { x: 0, y: 0 };
  const map = input.split("\n").map((row, rowNum) =>
    row.split("").map((cell, colNum) => {
      if (cell === "S") {
        start = { x: colNum, y: rowNum };
        return 0;
      } else if (cell === "E") {
        end = { x: colNum, y: rowNum };
        return 27;
      } else {
        return cell.charCodeAt(0) - 96;
      }
    })
  );
  return { map, start, end };
};

const getNeighbors = ({ x, y }: Coordinates, step: number): Option[] => {
  return [
    { x: x + 1, y: y, dir: ">", step },
    { x: x - 1, y: y, dir: "<", step },
    { x: x, y: y + 1, dir: "v", step },
    { x: x, y: y - 1, dir: "^", step },
  ];
};

const possible = (
  { x, y }: Coordinates,
  map: Map,
  originElevation: number,
  reverse: boolean
): boolean => {
  if (x >= map[0].length || x < 0 || y >= map.length || y < 0) {
    return false;
  }
  const targetElevation = map[y][x];
  const incline = reverse
    ? originElevation - targetElevation
    : targetElevation - originElevation;
  return incline <= 1;
};

export const part1 = (input: string): number => {
  const { map, start, end } = prepare(input);
  const visited = new Set<string>([`${start.x},${start.y}`]);
  console.log({ start, end, visited });
  const directions = Array(map.length)
    .fill(".")
    .map(() => Array(map[0].length).fill("."));
  const queue: Option[] = [{ x: start.x, y: start.y, dir: ">", step: 0 }];
  let pos: Option | undefined;
  let step = 1;
  while ((pos = queue.shift())) {
    step = pos.step;
    const options = getNeighbors(pos, step);
    directions[pos.y][pos.x] = pos.dir;
    if (pos.x === end.x && pos.y === end.y) {
      console.log(directions.map((a) => a.join("")).join("\n"));
      return step;
    }
    options.forEach(({ x, y, dir, step: nextStep }) => {
      step = nextStep;
      if (
        possible({ x, y }, map, map[pos?.y || 0][pos?.x || 0], false) &&
        !visited.has(`${x},${y}`)
      ) {
        visited.add(`${x},${y}`);
        queue.push({ x, y, dir, step: nextStep + 1 });
      }
    });
  }
  console.log(directions.map((a) => a.join("")).join("\n"));
  console.error("couldn't find the path");
  return step;
};

export const part2 = (input: string): number => {
  const { map, start, end } = prepare(input);
  const visited = new Set<string>([`${start.x},${start.y}`]);
  const directions = Array(map.length)
    .fill(".")
    .map(() => Array(map[0].length).fill("."));
  const queue: Option[] = [{ x: end.x, y: end.y, dir: ">", step: 0 }];
  let pos: Option | undefined;
  let step = 1;
  while ((pos = queue.shift())) {
    step = pos.step;
    const options = getNeighbors(pos, step);
    directions[pos.y][pos.x] = pos.dir;
    const elevation = map[pos?.y || 0][pos?.x || 0];
    if (elevation === 1) {
      console.log(directions.map((a) => a.join("")).join("\n"));
      return step;
    }
    options.forEach(({ x, y, dir, step: nextStep }) => {
      step = nextStep;
      if (
        possible({ x, y }, map, elevation, true) &&
        !visited.has(`${x},${y}`)
      ) {
        visited.add(`${x},${y}`);
        queue.push({ x, y, dir, step: nextStep + 1 });
      }
    });
  }
  console.log(directions.map((a) => a.join("")).join("\n"));
  console.error("couldn't find the path");
  return step;
};
