import { create, all } from "mathjs";
const mathjs = create(all);

type Monkey = {
  items: number[];
  operation: string;
  numberOfInspections: number;
  divisor: number;
  destination: {
    true: number;
    false: number;
  };
};

let worryRebate = true;
let common = 0;

const removePrefix = (part: string, marker = ": ") =>
  part.slice(part.lastIndexOf(marker) + 2);

const prepare = (input: string): Monkey[] => {
  return input.split("\n\n").map((m) => {
    const parts = m.split("\n").slice(1);
    const items = removePrefix(parts[0])
      .split(", ")
      .map((p) => parseInt(p));
    const monkey: Monkey = {
      items,
      numberOfInspections: 0,
      operation: removePrefix(removePrefix(parts[1]), "= "),
      divisor: parseInt(removePrefix(removePrefix(parts[2]), "y ")),
      destination: {
        true: parseInt(removePrefix(removePrefix(parts[3]), "y ")),
        false: parseInt(removePrefix(removePrefix(parts[4]), "y ")),
      },
    };
    return monkey;
  });
};

const monkeyTurn = (
  monkey: Monkey,
  _monkeyNumber: number,
  monkeys: Monkey[]
) => {
  while (monkey.items.length > 0) {
    monkey.numberOfInspections++;
    let old = monkey.items.splice(0, 1);
    let worry = mathjs.evaluate(
      monkey.operation.replace(/old/g, old.toString())
    );
    worry = worryRebate ? Math.floor(worry / 3) : worry % common;
    const divisible = worry % monkey.divisor === 0;
    const destination = monkey.destination[divisible ? "true" : "false"];
    monkeys[destination].items.push(worry);
  }
};

export const monkeyAbout = (
  input: string,
  relief = true,
  rounds = 20
): number => {
  worryRebate = relief;
  const monkeys = prepare(input);
  [...Array(rounds).keys()].forEach(() => monkeys.forEach(monkeyTurn));
  common = monkeys.reduce((total, monkey) => total * monkey.divisor, 1);
  const activity = monkeys.map((m) => m.numberOfInspections);
  const monkeyBusiness = activity.sort((a, b) => b - a).slice(0, 2);
  return monkeyBusiness.reduce((t, v) => t * v, 1);
};
