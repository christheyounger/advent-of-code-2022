const splitSack = (input: string): string[] => {
  const half = Math.floor(input.length / 2);
  const top = input.slice(0, half);
  const bottom = input.slice(half, input.length);
  return [top, bottom];
};

const similarities = (a: string, b: string): string => {
  return a
    .split("")
    .filter((item) => b.includes(item))
    .join("");
};

const isUpperCase = (letter: string): boolean => {
  return letter.charCodeAt(0) < 91;
};

const getLetterCode = (letter: string): number => {
  return letter.charCodeAt(0) - (isUpperCase(letter) ? 38 : 96);
};

export const part1 = (input: string): number => {
  const sacks = input.split("\n").map((sack) => splitSack(sack));
  const items = sacks.map(([top, bottom]) =>
    similarities(top, bottom).slice(0, 1)
  );
  return items
    .map(getLetterCode)
    .reduce((total, priority) => total + priority, 0);
};

export const part2 = (input: string): number => {
  const sacks = input.split("\n");
  let badges: string[] = [];
  for (let i = 0; i < sacks.length / 3; i++) {
    const group = sacks.slice(i * 3, i * 3 + 3);
    badges.push(
      similarities(similarities(group[0], group[1]), group[2]).slice(0, 1)
    );
  }
  return badges
    .map(getLetterCode)
    .reduce((total, priority) => total + priority, 0);
};
