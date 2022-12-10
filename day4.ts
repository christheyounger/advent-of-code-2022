
const range = (start: number, end: number): number[] => 
    [...Array(end-start+1).keys()].map(i => i + start)

const countOverlap = (range1: number[], range2: number[]) => 
    range1.filter(elem => range2.includes(elem)).length

export const part1 = (input: string): number => {
    const pairs = input.split('\n').map(p => p.split(',').map(r => r.split('-').map(n => parseInt(n))))
    const ranges = pairs.map(p => p.map(r => range(r[0], r[1])))
    return ranges.reduce((total, pair) => {
        const overlap = countOverlap(pair[0], pair[1])
        return total + ((overlap === pair[0].length || overlap === pair[1].length) ? 1 : 0)
    }, 0);
}

export const part2 = (input: string): number => {
    const pairs = input.split('\n').map(p => p.split(',').map(r => r.split('-').map(n => parseInt(n))))
    const ranges = pairs.map(p => p.map(r => range(r[0], r[1])))
    return ranges.reduce((total, pair) => {
        const overlap = countOverlap(pair[0], pair[1])
        return total + (overlap ? 1 : 0)
    }, 0);   
}