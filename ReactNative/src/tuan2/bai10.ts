export function randomPromise(): Promise<string> {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.5; // 50% thành công - 50% thất bại
    setTimeout(() => {
      if (success) {
        resolve("Thành công!");
      } else {
        reject("Thất bại!");
      }
    }, 1000);
  });
}
