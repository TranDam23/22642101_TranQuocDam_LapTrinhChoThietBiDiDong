// bai11.ts

// Hàm trả về Promise
function getHelloAsync(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello Async");
    }, 2000);
  });
}

// Dùng async/await
export async function run11() {   // ✅ thêm export
  const message = await getHelloAsync();
  console.log("\nBai11:");
  console.log(message);
}
