
const labels = {
    1: 'Rock',
    2: 'Paper',
    3: 'Scissors',
}
const values = {
    'A': 1, //rock
    'B': 2, //paper
    'C': 3, //scissors
    'X': 1, //rock
    'Y': 2, //paper
    'Z': 3, //scissors
}
const partners = {
    1: { X: 3, Y: 1, Z: 2 },
    2: { X: 1, Y: 2, Z: 3 },
    3: { X: 2, Y: 3, Z: 1 },
}

const winner = (opponent: 1|2|3, you: 1|2|3) => {
    let win = opponent < you;
    if (labels[opponent] === 'Rock' && labels[you] === 'Scissors') win = false;
    if (labels[opponent] === 'Scissors' && labels[you] === 'Rock') win = true;
    console.log({opp: labels[opponent], you: labels[you], win});
    return win;
}

export const part1 = (input: string) => {
    const rounds = input.split('\n')
    const scores = rounds.map((round) => {
        let [a, b] = round.split(' ');
        const opponent = values[a as 'A'|'B'|'C'] as 1|2|3;
        const you = values[b as 'X'|'Y'|'Z'] as 1|2|3;
        const draw = opponent === you;
        const win = winner(opponent, you)
        const score = you + (win ? 6 : (draw ? 3 : 0));
        return score;
    })
    const total = scores.reduce((t, i) => t + i, 0);
    return total;
}

export const part2 = (input: string) => {
    const rounds = input.split('\n')
    const scores = rounds.map((round) => {
        let [a, b] = round.split(' ');
        const opponent = values[a as 'A'|'B'|'C'] as 1|2|3;
        const you = partners[opponent][b as 'X'|'Y'|'Z'] as 1|2|3;
        const draw = opponent === you;
        const win = winner(opponent, you)
        const score = you + (win ? 6 : (draw ? 3 : 0));
        return score;
    })
    const total = scores.reduce((t, i) => t + i, 0);
    return total;
}