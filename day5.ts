type Instruction = {
  move: number;
  from: number;
  to: number;
};
type Stack = string[];
let stacks: Stack[];
const prepareStacks = (input: string): Stack[] => {
  const lines = input.split("\n");
  const stackNumbers = lines
    .reverse()[0]
    .split("  ")
    .map((i) => parseInt(i.trim()));
  return stackNumbers.map((number): Stack => {
    const index = 1 + 4 * (number - 1);
    return lines
      .slice(1)
      .filter((line) => line.slice(index, index + 1).trim())
      .map((line) => line.slice(index, index + 1).trim());
  });
};
const prepareInstructions = (input: string): Instruction[] =>
  input.split("\n").map((instruction): Instruction => {
    const [_a, move, _b, from, _c, to] = instruction
      .split(" ")
      .map((n) => parseInt(n));
    return { move, from, to };
  });

const executeMove = ({ move, from, to }: Instruction) => {
  for (let i = 0; i < move; i++) {
    stacks[to - 1].push(
      stacks[from - 1].splice(stacks[from - 1].length - 1, 1)[0]
    );
  }
};
const executeMultiMove = ({ move, from, to }: Instruction) => {
  stacks[to - 1].push(
    ...stacks[from - 1].splice(stacks[from - 1].length - move, move)
  );
};
const prepare = (input: string): Instruction[] => {
  const [stacksDrawing, instructions] = input.split("\n\n");
  stacks = prepareStacks(stacksDrawing);
  return prepareInstructions(instructions);
};
export const part1 = (input: string): string => {
  const sequence = prepare(input);
  sequence.forEach(executeMove);
  return stacks.map((stack) => stack[stack.length - 1]).join("");
};
export const part2 = (input: string): string => {
  const sequence = prepare(input);
  sequence.slice(0, sequence.length).forEach(executeMultiMove);
  return stacks.map((stack) => stack[stack.length - 1]).join("");
};
