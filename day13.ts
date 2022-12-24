type packet = number | packet[];
type pair = [packet, packet];

const prepare = (input: string): pair[] => {
  return input.split("\n\n").map((pair) => {
    const [one, two] = pair.split("\n").map((packet) => JSON.parse(packet));
    return [one, two];
  });
};

const compare = (pair: pair): number => {
  let [a, b] = pair;
  if (Array.isArray(a) && Array.isArray(b)) {
    console.log(`compare ${a} vs ${b}`);
    // do nothing
  } else if (Array.isArray(a)) {
    b = typeof b !== "undefined" ? [b] : [];
    console.log(`compare ${a} vs ${b}`);
  } else if (Array.isArray(b)) {
    a = typeof a !== "undefined" ? [a] : [];
    console.log(`compare ${a} vs ${b}`);
  } else {
    console.log(`compare ${a} vs ${b}`);
    return b - a;
  }
  for (let i = 0; i < a.length && i < b.length; i++) {
    const val = compare([a[i], b[i]]);
    if (val !== 0) return val;
  }
  if (a.length === b.length) return 0; // all done here

  console.log(`no decision - b.length - a.length = ${b.length - a.length}`);
  return b.length - a.length;
};

export const part1 = (input: string): number => {
  const indicies: number[] = [];
  const pairs = prepare(input);
  pairs.forEach((pair, index) => {
    console.log(`pair ${index + 1}`);
    if (compare(pair) >= 0) {
      console.log("left side is smaller so inputs are in the right order");
      indicies.push(index + 1);
    } else {
      console.log("right side is smaller so inputs are not in the right order");
    }
  });
  console.log({ indicies });
  return indicies.reduce((total, index) => total + index, 0);
};
