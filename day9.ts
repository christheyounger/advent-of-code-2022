type Direction = "U" | "L" | "R" | "D";

type Movement = {
  direction: Direction;
  distance: number;
};

type Location = [number, number];

const moveHead = (location: Location, movement: Movement): Location => {
  switch (movement.direction) {
    case "D":
      location[0]--;
      break;
    case "U":
      location[0]++;
      break;
    case "L":
      location[1]--;
      break;
    case "R":
      location[1]++;
      break;
  }
  return location;
};

const moveTail = (
  tailLocation: Location,
  headLocation: Location,
  { direction }: Movement
): Location => {
  if (
    tailLocation[0] === headLocation[0] &&
    Math.abs(tailLocation[1] - headLocation[1]) > 1
  ) {
    tailLocation[1] += direction === "L" ? -1 : 1;
  } else if (
    tailLocation[1] === headLocation[1] &&
    Math.abs(tailLocation[0] - headLocation[0]) > 1
  ) {
    tailLocation[0] += direction === "D" ? -1 : 1;
  } else if (
    tailLocation[0] !== headLocation[0] &&
    tailLocation[1] !== headLocation[1] &&
    (Math.abs(tailLocation[1] - headLocation[1]) > 1 ||
      Math.abs(tailLocation[0] - headLocation[0]) > 1)
  ) {
    tailLocation[1] += headLocation[1] - tailLocation[1] > 0 ? 1 : -1;
    tailLocation[0] += headLocation[0] - tailLocation[0] > 0 ? 1 : -1;
  }
  return tailLocation;
};

export const part1 = (input: string, length: number = 2): number => {
  const knots: Location[] = Array(length)
    .fill([])
    .map(() => [0, 0]);
  const coordinates: string[] = [];
  const instructions: Movement[] = input.split("\n").map((line) => {
    const [direction, distanceStr] = line.split(" ");
    return {
      direction: direction as Direction,
      distance: parseInt(distanceStr),
    };
  });
  instructions.forEach((instruction) => {
    const { direction, distance } = instruction;
    [...Array(distance).keys()].forEach(() => {
      [knots[0][0], knots[0][1]] = moveHead(knots[0], {
        direction,
        distance,
      });

      knots.forEach((knot, index) => {
        if (index < 1) return;
        [knots[index][0], knots[index][1]] = moveTail(knot, knots[index - 1], {
          direction,
          distance,
        });
      });

      coordinates.push(
        `${knots[knots.length - 1][0]}:${knots[knots.length - 1][1]}`
      );
    });
  });
  return [...new Set(coordinates.sort())].length;
};
