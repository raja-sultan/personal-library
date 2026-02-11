export function objFromArray<T>(arr: T[], key = "id"): Record<string, T> {
  return arr.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
}
