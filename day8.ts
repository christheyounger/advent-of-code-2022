const visibleRow = (tree: number, index: number, row: number[]): boolean => {
  if (index === 0 || index === row.length - 1) return true;
  if (row.slice(0, index).some((t) => t >= tree) === false) return true;
  if (row.slice(index + 1).some((t) => t >= tree) === false) return true;
  return false;
};

export const part1 = (input: string): number => {
  const treeMatrix = input
    .split("\n")
    .map((row) => row.split("").map((tree) => parseInt(tree)));
  const resultMatrix: number[][] = Array(treeMatrix.length).fill(
    Array(treeMatrix[0].length).fill(0)
  );
  treeMatrix.forEach((row, rowNum) => {
    resultMatrix[rowNum] = row.map((tree, index, row) => {
      const col: number[] = treeMatrix.map((row) => row[index]);
      return visibleRow(tree, index, row) || visibleRow(tree, rowNum, col)
        ? 1
        : 0;
    });
  });
  return resultMatrix.reduce(
    (total, row) =>
      total + row.reduce((total, treeVisible) => total + treeVisible, 0),
    0
  );
};

const viewScore = (tree: number, row: number[], index: number): number => {
  let score = 0;
  for (let i = index + 1; i < row.length; i++) {
    score++;
    if (row[i] >= tree) break;
  }
  return score;
};

const viewScoreTotal = (
  tree: number,
  row: number[],
  col: number[],
  rowNum: number,
  index: number
): number => {
  const revRow = [...row].reverse();
  const revCol = [...col].reverse();
  return (
    viewScore(tree, row, index) *
    viewScore(tree, revRow, row.length - index - 1) *
    viewScore(tree, col, rowNum) *
    viewScore(tree, revCol, col.length - rowNum - 1)
  );
};

export const part2 = (input: string): number => {
  const treeMatrix = input
    .split("\n")
    .map((row) => row.split("").map((tree) => parseInt(tree)));
  const resultMatrix: number[][] = Array(treeMatrix.length).fill(
    Array(treeMatrix[0].length).fill(0)
  );
  treeMatrix.forEach((row, rowNum) => {
    resultMatrix[rowNum] = row.map((tree, index, row) => {
      const col = treeMatrix.map((row) => row[index]);
      return viewScoreTotal(tree, row, col, rowNum, index);
    });
  });
  return resultMatrix.reduce(
    (winner, row) =>
      Math.max(
        winner,
        row.reduce((winner, treeScore) => Math.max(winner, treeScore)),
        0
      ),
    0
  );
};
