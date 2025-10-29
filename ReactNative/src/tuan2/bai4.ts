export function getRandomNumber(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const num = Math.floor(Math.random() * 100); // số ngẫu nhiên 0-99
      if (num >= 0) {
        resolve(num);
      } else {
        reject("Lỗi! Không tạo được số.");
      }
    }, 1000);
  });
}
