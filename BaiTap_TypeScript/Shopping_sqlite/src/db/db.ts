import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabaseSync("shopping.db");

// Khởi tạo CSDL
export async function initDB() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products(
      product_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK(price >= 0),
      stock INTEGER NOT NULL CHECK(stock >= 0)
    );

    CREATE TABLE IF NOT EXISTS cart_items(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      qty INTEGER NOT NULL CHECK(qty > 0),
      UNIQUE(product_id),
      FOREIGN KEY(product_id) REFERENCES products(product_id)
    );
  `);
}

// Thêm dữ liệu mẫu nếu chưa có
export async function seedProducts() {
  const result = await db.getAllAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM products`
  );

  if (result[0]?.count === 0) {
    const sample = [
      { id: "p1", name: "Điện thoại oppo", price: 12000000, stock: 17 },
      { id: "p2", name: "Tai nghe", price: 300000, stock: 25 },
      { id: "p3", name: "Máy tính bảng", price: 8000000, stock: 13 },
      { id: "p4", name: "Kính cường lực", price: 30000, stock: 130 },
      { id: "p5", name: "Ốp lưng điện thoại", price: 130000, stock: 40 },
    ];

    for (const p of sample) {
      await db.runAsync(
        `INSERT INTO products (product_id, name, price, stock) VALUES (?, ?, ?, ?)`,
        [p.id, p.name, p.price, p.stock]
      );
    }

    console.log("Đã thêm 10 sản phẩm mẫu vào CSDL!");
  }
}

export default db;