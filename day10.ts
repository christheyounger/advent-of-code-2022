let cycle = 1,
  register = 1;
const strengths: number[] = [];
const registerHistory: number[] = [];

const execute = (lines: string[]) => {
  for (let line = 0; cycle < 241 && line < lines.length; cycle++, line++) {
    registerHistory.push(register);
    const [command, value] = lines[line].split(" ");
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
      strengths.push(cycle * register);
    }
    if (command === "addx") {
      cycle++;
      registerHistory.push(register);
      if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
        strengths.push(cycle * register);
      }
      register += parseInt(value);
    }
  }
};

export const part1 = (input: string): number => {
  const lines = input.split("\n");
  execute(lines);
  return strengths.reduce((total, strength) => total + strength, 0);
};

export const part2 = (input: string): string => {
  const lines = input.split("\n");
  execute(lines);
  return registerHistory
    .map((register, i) => {
      while (i > 39) i -= 40;
      const sprite = [register, register + 1, register + 2];
      return sprite.includes(i + 1) ? "#" : ".";
    })
    .join("")
    .split(/(.{40})/)
    .filter((O) => O)
    .join("\n");
};
