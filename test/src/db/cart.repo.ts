import { CartItem } from "../models/types";
import db from "./db";

// 🛒 Lấy danh sách giỏ hàng
export const getCart = async (): Promise<CartItem[]> =>
    db.getAllAsync(`
    SELECT c.id, c.product_id, p.name, p.price, c.qty, p.stock
    FROM cart_items c
    JOIN products p ON c.product_id = p.product_id
  `);

// ➕ Thêm sản phẩm vào giỏ (kiểm tra tồn kho)
export async function addToCart(productId: string): Promise<boolean> {
    const product = await db.getFirstAsync<{ stock: number; name: string }>(
        "SELECT stock, name FROM products WHERE product_id = ?", [productId]
    );
    if (!product) return console.warn("⚠️ Sản phẩm không tồn tại"), false;
    if (product.stock <= 0) return console.warn(`⚠️ "${product.name}" hết hàng`), false;

    const existing = await db.getFirstAsync<{ qty: number }>(
        "SELECT qty FROM cart_items WHERE product_id = ?", [productId]
    );

    if (existing) {
        if (existing.qty >= product.stock)
            return console.warn(`⚠️ Vượt quá tồn kho (${product.stock})`), false;
        await db.runAsync("UPDATE cart_items SET qty = qty + 1 WHERE product_id = ?", [productId]);
    } else {
        await db.runAsync("INSERT INTO cart_items(product_id, qty) VALUES (?, 1)", [productId]);
    }
    return true;
}

// 🔄 Cập nhật số lượng trong giỏ (kiểm tra tồn kho)
export async function updateQty(id: number, qty: number): Promise<boolean> {
    const cartItem = await db.getFirstAsync<{ product_id: string; stock: number }>(
        `SELECT c.product_id, p.stock FROM cart_items c
     JOIN products p ON c.product_id = p.product_id WHERE c.id = ?`, [id]
    );
    if (!cartItem) return console.warn("⚠️ Không tìm thấy sản phẩm"), false;
    if (qty > cartItem.stock) return console.warn(`⚠️ Vượt quá tồn kho (${cartItem.stock})`), false;

    await db.runAsync(
        qty <= 0 ? "DELETE FROM cart_items WHERE id = ?" : "UPDATE cart_items SET qty = ? WHERE id = ?",
        qty <= 0 ? [id] : [qty, id]
    );
    return true;
}
