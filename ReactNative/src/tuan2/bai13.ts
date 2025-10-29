function simulateTask(ms: number, shouldFail = false): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Task failed after ${ms} ms`));
      } else {
        resolve(`Task completed in ${ms} ms`);
      }
    }, ms);
  });
}

export async function run13() {
  try {
    const result = await simulateTask(2000, false);
    console.log("\nBai13:");
    console.log(result);
  } catch (error) {
    console.log("\nBai13:");
    console.error("Error caught:", (error as Error).message);
  }
}

