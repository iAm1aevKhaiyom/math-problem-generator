export function getRandomInteger(args: { from: number; upTo: number }) {
  const { from, upTo } = args;
  return from + ((Math.random() * (upTo - from)) | 0);
}

export function applyOperation(args: {
  x: number;
  y: number;
  operation: string;
}) {
  const { operation, x, y } = args;
  return {
    "+": x + y,
    "-": x - y,
    "*": x * y,
    "/": x / y,
  }[operation];
}
