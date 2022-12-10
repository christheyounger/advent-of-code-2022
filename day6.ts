export const scan = (input: string, packetLength: number) => {
  for (let i = packetLength; i < input.length; i++) {
    const set = [...new Set(input.slice(i - packetLength, i))];
    if (set.length >= packetLength) {
      return i;
    }
  }
};
