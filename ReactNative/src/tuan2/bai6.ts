export function runParallelTasks() {
  // Hàm tạo Promise mô phỏng 1 task
  function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Thực hiện trong: ${time} ms`);
      }, time);
    });
  }

  // Tạo 3 Promise chạy song song
  const tasks = [
    simulateTask(1000), // 1 giây
    simulateTask(2000), // 2 giây
    simulateTask(3000), // 3 giây
  ];

  // Dùng Promise.all để chờ tất cả xong
  Promise.all(tasks).then((results) => {
    console.log("\nBai6:");
    console.log("Task hoàn thành:", results);
  });
}
