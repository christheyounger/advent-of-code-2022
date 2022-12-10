const getTotals = (elves: string[]): number[] =>
  elves.map((elf) => {
    return elf.split("\n").reduce((total, snack) => total + parseInt(snack), 0);
  });

export const part1 = (input: string): number => {
  const elves = input.split("\n\n");
  const totals = getTotals(elves);
  return totals.sort((a, b) => a - b).reverse()[0];
};

export const part2 = (input: string): number => {
  const elves = input.split("\n\n");
  const totals = getTotals(elves);
  const top3 = totals
    .sort((a, b) => a - b)
    .reverse()
    .slice(0, 3);
  return top3.reduce((total, elf) => total + elf, 0);
};
