const diskSize = 70000000;
const spaceRequired = 30000000;
const maxSize = 100000;
let sizes: { [key: string]: number } = {};

export const prepare = (input: string): void => {
  const lines = input.split("\n");
  let currentDir = "",
    curSize = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(" ");
    if (line[0] === "$") {
      if (line[1] === "cd") {
        const dir = line[2];
        if (dir === "..") {
          currentDir = currentDir.slice(0, currentDir.length - 1);
          currentDir = currentDir.slice(0, currentDir.lastIndexOf("/")) + "/";
          curSize = sizes[currentDir] + curSize;
          sizes[currentDir] = curSize;
        } else {
          curSize = 0;
          currentDir = `${currentDir}${dir}${dir === "/" ? "" : "/"}`;
        }
      }
    } else {
      const size = line[0];
      curSize += parseInt(size) || 0;
      sizes[currentDir] = curSize;
    }
  }
  // equivalent of `cd ..` back up to root.
  const finalDir = currentDir.slice(1, currentDir.length - 1).split("/");
  for (let i = 0; i < finalDir.length; i++) {
    currentDir = currentDir.slice(0, currentDir.length - 1);
    currentDir = currentDir.slice(0, currentDir.lastIndexOf("/")) + "/";
    curSize = sizes[currentDir] + curSize;
    sizes[currentDir] = curSize;
  }
};

export const part1 = (input: string): number => {
  prepare(input);
  const total = Object.keys(sizes).reduce(
    (total, key) => total + (sizes[key] <= maxSize ? sizes[key] : 0),
    0
  );
  return total;
};

export const part2 = (input: string): number => {
  prepare(input);
  const actualSizes = Object.keys(sizes).map((key) => sizes[key]);
  const minSize = spaceRequired - (diskSize - sizes["/"]);
  const winners = actualSizes
    .filter((size) => size >= minSize)
    .sort((a, b) => a - b);
  return winners[0];
};
