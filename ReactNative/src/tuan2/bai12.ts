function simulateTask(ms: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task hoàn thành trong ${ms} ms`);
    }, ms);
  });
}

export async function run12() {
  const result = await simulateTask(2000);
    console.log("\nBai12:");
  console.log(result);
}
