export function filterEvenNumbers(arr: number[]): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const evens = arr.filter((num) => num % 2 === 0);
      resolve(evens);
    }, 1000);
  });
}
