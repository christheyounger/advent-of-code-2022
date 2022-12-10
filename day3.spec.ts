import { part1, part2 } from "./day3"

const input = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`

describe('day 3', () => {
    test('part1', () => {
        expect (part1(input.trim())).toEqual(157)
    })
    test('part2', () => {
        expect (part2(input.trim())).toEqual(70)
    })
})