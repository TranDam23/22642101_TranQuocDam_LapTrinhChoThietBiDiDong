export function runRaceTasks() {
  // Hàm tạo Promise mô phỏng 1 task
  function simulateTask(time: number, name: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`${name} hoàn thành trong ${time} ms`);
      }, time);
    });
  }

  // Tạo 3 Promise chạy song song
  const task1 = simulateTask(1000, "Task 1"); // 1 giây
  const task2 = simulateTask(2000, "Task 2"); // 2 giây
  const task3 = simulateTask(3000, "Task 3"); // 3 giây

  // Dùng Promise.race để lấy kết quả của Promise hoàn thành đầu tiên
  Promise.race([task1, task2, task3]).then((result) => {
    console.log("\nBai7:");
    console.log("Task hoàn thành đầu tiên:", result);
  });
}
