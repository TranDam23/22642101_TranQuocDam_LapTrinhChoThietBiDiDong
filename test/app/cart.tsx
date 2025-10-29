import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { getCart, updateQty } from "../src/db/cart.repo";
import { createOrder } from "../src/db/orders.repo";
import { CartItem } from "../src/models/types";

export default function CartScreen() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const loadCart = async () => setCart(await getCart());
    useEffect(() => { loadCart(); }, []);
    useFocusEffect(useCallback(() => { loadCart(); }, []));

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    const changeQty = async (id: number, qty: number, stock: number) => {
        if (qty > stock) return Alert.alert("Hết hàng");
        if (qty < 1)
            return Alert.alert("Xoá sản phẩm", "Bạn muốn xoá khỏi giỏ?", [
                { text: "Hủy" },
                { text: "Xoá", onPress: async () => { await updateQty(id, 0); loadCart(); } },
            ]);
        await updateQty(id, qty);
        loadCart();
    };

    const checkout = async () => {
        try {
            const orderId = await createOrder(cart);
            Alert.alert("Thành công", `Đơn hàng #${orderId} đã được tạo`);
            loadCart();
        } catch {
            Alert.alert("Lỗi", "Không thể tạo đơn hàng");
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>🛒 Giỏ hàng của bạn</Text>

            {cart.length === 0 ? (
                <Text style={{ textAlign: "center", color: "#666", marginTop: 30 }}>Chưa có sản phẩm nào.</Text>
            ) : (
                <FlatList
                    data={cart}
                    keyExtractor={(i) => i.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10, marginVertical: 6 }}>
                            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                            <Text>{item.price}₫ x {item.qty}</Text>
                            <Text style={{ color: "#666" }}>Tồn kho: {item.stock}</Text>

                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: "#007AFF", paddingHorizontal: 10, borderRadius: 4 }}
                                    onPress={() => changeQty(item.id, item.qty - 1, item.stock)}
                                >
                                    <Text style={{ color: "#fff", fontWeight: "bold" }}>−</Text>
                                </TouchableOpacity>
                                <Text style={{ marginHorizontal: 8 }}>{item.qty}</Text>
                                <TouchableOpacity
                                    style={{ backgroundColor: "#007AFF", paddingHorizontal: 10, borderRadius: 4 }}
                                    onPress={() => changeQty(item.id, item.qty + 1, item.stock)}
                                >
                                    <Text style={{ color: "#fff", fontWeight: "bold" }}>＋</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}

            <View style={{ marginTop: 20, alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Tổng cộng: {total}₫</Text>
                {cart.length > 0 && (
                    <TouchableOpacity
                        style={{ backgroundColor: "#28A745", paddingVertical: 10, paddingHorizontal: 30, borderRadius: 6 }}
                        onPress={checkout}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Thanh toán</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
