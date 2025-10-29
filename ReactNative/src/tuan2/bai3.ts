export function throwError(): Promise<string> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("Đã xảy ra lỗi!");
    }, 1000);
  });
}
