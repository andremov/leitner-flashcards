export function mapBox(newBox: number): number {
  const boxMapping = [1, 2, 3, 5, 8, 13, 21, 34, 55];

  if (newBox > boxMapping.length) {
    return boxMapping[boxMapping.length - 1]!;
  }

  return boxMapping[newBox]!;
}
