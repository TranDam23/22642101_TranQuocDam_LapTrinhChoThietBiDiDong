import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList, Text, TextInput,
  TouchableOpacity, View
} from "react-native";
import Toast from "react-native-toast-message";
import { addToCart } from "../../src/db/cart.repo";
import { initDB, seedProducts } from "../../src/db/db";
import { findProductsByName, getAllProducts } from "../../src/db/product.repo";
import { Product } from "../../src/models/types";

export default function ProductScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await initDB();
      await seedProducts();
      const list = await getAllProducts();
      setProducts(list);
    })();
  }, []);

  useEffect(() => {
    const t = setTimeout(async () => {
      const list = search ? await findProductsByName(search) : await getAllProducts();
      setProducts(list);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const handleAdd = async (p: Product) => {
    const ok = await addToCart(p.product_id);
    Toast.show({
      type: ok ? "success" : "error",
      text1: ok ? "Đã thêm vào giỏ 🎉" : "Hết hàng",
      text2: ok ? p.name : "Sản phẩm đã hết hàng hoặc vượt tồn kho",
      position: "bottom",
      visibilityTime: 1200
    });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sản phẩm</Text>
        <TouchableOpacity onPress={() => router.push("/cart")}>
          <Text style={{ backgroundColor: "blue", color: "white", padding: 8, borderRadius: 6 }}>Giỏ hàng</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        placeholder="Tìm sản phẩm..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1, borderColor: "#ccc", borderRadius: 6,
          paddingHorizontal: 10, height: 40, marginBottom: 10
        }}
      />

      {/* Product list */}
      <FlatList
        data={products}
        keyExtractor={i => i.product_id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "white",
              padding: 10,
              marginBottom: 8,
              borderRadius: 8
            }}
          >
            <View>
              <Text>{item.name}</Text>
              <Text>{item.price.toLocaleString()}₫</Text>
              <Text>Tồn kho: {item.stock}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleAdd(item)}
              disabled={item.stock === 0}
              style={{
                backgroundColor: item.stock === 0 ? "gray" : "green",
                padding: 8,
                borderRadius: 6
              }}
            >
              <Text style={{ color: "white" }}>
                {item.stock === 0 ? "Hết" : "+ Thêm"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Toast />
    </View>
  );
}
