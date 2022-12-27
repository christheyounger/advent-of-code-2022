type point = [number, number];
type reading = {
  sensor: point;
  becon: point;
  distance: number;
};

const minSearch = 0;
const tuningFactor = 4000000;

const getTaxiDistance = (pointA: point, pointB: point): number => {
  return Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1]);
};

const prepare = (input: string): reading[] => {
  const sensors: reading[] = input.split("\n").map((line) => {
    const [sensor, becon] = line.split(":").map((part): point => {
      const points = part
        .split(",")
        .map((half) => parseInt(half.split("=")[1]));
      return [points[0], points[1]];
    });
    const distance = getTaxiDistance(sensor, becon);
    return { sensor, becon, distance };
  });
  return sensors;
};

const getOffSet = ({ sensor, distance }: reading, row: number): number =>
  distance - Math.abs(sensor[1] - row);

const beconRange = (reading: reading, row: number): number[] => {
  const offset = getOffSet(reading, row);
  return offset <= 0
    ? []
    : [...Array(offset * 2 + 1).keys()].map(
        (v) => v + reading.sensor[0] - offset
      );
};

const beconRangeEnds = (reading: reading, row: number): [number, number] => {
  const offset = getOffSet(reading, row);
  return [reading.sensor[0] - offset, reading.sensor[0] + offset];
};

const beconsOnRow = (readings: reading[], row: number): number[] =>
  readings.filter(({ becon }) => becon[1] === row).map(({ becon }) => becon[0]);

const lineCoverage = (readings: reading[], row: number): number =>
  new Set(readings.map((reading) => beconRange(reading, row)).flat()).size -
  new Set(beconsOnRow(readings, row)).size;

const outside = (val: number, range: number[]): boolean =>
  val < range[0] || val > range[range.length - 1];

const findUnscannedSpace = (readings: reading[], maxSearch: number): point => {
  for (let y = minSearch; y <= maxSearch; y++) {
    const ranges = readings
      .filter((r) => getOffSet(r, y) > 0)
      .map((r) => beconRangeEnds(r, y));
    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i];
      const before = range[0] - 1;
      const after = range[range.length - 1] + 1;
      if (before >= minSearch && ranges.every((r) => outside(before, r))) {
        return [before, y];
      }
      if (after <= maxSearch && ranges.every((r) => outside(after, r))) {
        return [after, y];
      }
    }
  }
  throw new Error("Couldn't find a space");
};

export const part1 = (input: string, row: number): number =>
  lineCoverage(prepare(input), row);

export const part2 = (input: string, maxSearch = 20): number => {
  const readings = prepare(input);
  const spot = findUnscannedSpace(readings, maxSearch);
  return spot[0] * tuningFactor + spot[1];
};
