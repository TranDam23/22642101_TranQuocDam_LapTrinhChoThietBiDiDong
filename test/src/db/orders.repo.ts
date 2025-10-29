import { CartItem, Order, OrderItem } from "../models/types";
import db from "./db";

// 🧾 1. Danh sách đơn hàng
export const listOrders = async (): Promise<Order[]> =>
    db.getAllAsync("SELECT id, note, total, created_at FROM orders ORDER BY created_at DESC");

// 🧾 2. Chi tiết đơn hàng + sản phẩm
export async function getOrderDetail(orderId: number) {
    const order = await db.getFirstAsync<Order>(
        "SELECT id, note, total, created_at FROM orders WHERE id = ?", [orderId]
    );
    if (!order) return { order: null, items: [] };

    const items = await db.getAllAsync<OrderItem>(
        `SELECT oi.id, oi.order_id, oi.product_id, p.name, oi.qty, oi.unit_price, oi.line_total
     FROM order_items oi JOIN products p ON oi.product_id = p.product_id
     WHERE oi.order_id = ?`, [orderId]
    );
    return { order, items };
}

// 🧾 3. Tạo đơn hàng từ giỏ hàng
export async function createOrder(items: CartItem[], note?: string) {
    if (!items.length) throw new Error("❌ Giỏ hàng trống!");

    const total = items.reduce((t, i) => t + i.price * i.qty, 0);
    const { lastInsertRowId: orderId } = await db.runAsync(
        "INSERT INTO orders (note, total) VALUES (?, ?)", [note || "", total]
    );
    if (!orderId) throw new Error("❌ Lỗi khi tạo đơn hàng!");

    for (const i of items) {
        const lineTotal = i.price * i.qty;
        await db.runAsync(
            `INSERT INTO order_items(order_id, product_id, qty, unit_price, line_total)
       VALUES (?, ?, ?, ?, ?)`,
            [orderId, i.product_id, i.qty, i.price, lineTotal]
        );
        await db.runAsync("UPDATE products SET stock = stock - ? WHERE product_id = ?", [i.qty, i.product_id]);
    }

    await db.runAsync("DELETE FROM cart_items");
    console.log(`✅ Tạo đơn hàng #${orderId} thành công!`);
    return orderId;
}

// 🧾 4. Cập nhật ghi chú / tổng tiền
export async function updateOrder(id: number, note?: string, total?: number) {
    const f = [], p: any[] = [];
    if (note !== undefined) f.push("note = ?"), p.push(note);
    if (total !== undefined) f.push("total = ?"), p.push(total);
    if (!f.length) return false;
    p.push(id);
    await db.runAsync(`UPDATE orders SET ${f.join(", ")} WHERE id = ?`, p);
    return true;
}

// 🧾 5. Xóa đơn hàng
export const deleteOrder = async (id: number) => (
    await db.runAsync("DELETE FROM orders WHERE id = ?", [id]), true
);

// 🧾 6. Danh sách sản phẩm trong đơn
export const listOrderItems = async (orderId: number) =>
    db.getAllAsync(
        `SELECT oi.id, oi.order_id, oi.product_id, p.name, oi.qty, oi.unit_price, oi.line_total
     FROM order_items oi JOIN products p ON oi.product_id = p.product_id
     WHERE oi.order_id = ?`, [orderId]
    );
