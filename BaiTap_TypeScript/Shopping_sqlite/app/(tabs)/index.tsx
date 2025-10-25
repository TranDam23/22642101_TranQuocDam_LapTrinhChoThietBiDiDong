import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { addToCart } from "../../src/db/cart.repo";
import { initDB, seedProducts } from "../../src/db/db";
import { findProductsByName, getAllProducts } from "../../src/db/product.repo";
import { Product } from "../../src/models/types";

export default function ProductScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"none" | "asc" | "desc">("none");
  const router = useRouter();

  async function loadData(keyword?: string, sortOrder?: "asc" | "desc" | "none") {
    let list =
      keyword && keyword.trim() !== ""
        ? await findProductsByName(keyword)
        : await getAllProducts();

    if (sortOrder === "asc") list.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") list.sort((a, b) => b.price - a.price);

    setProducts(list);
  }

  useEffect(() => {
    (async () => {
      await initDB();
      await seedProducts();
      await loadData();
    })();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      loadData(search, filter);
    }, 300);
    return () => clearTimeout(delay);
  }, [search, filter]);

  const scaleAnim = new Animated.Value(1);
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>🛍️ Danh sách sản phẩm</Text>

        <TouchableOpacity style={styles.cartButton} onPress={() => router.push("/cart")}>
          <Ionicons name="cart" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* SEARCH + FILTER */}
      <View style={styles.searchFilterRow}>
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Nhập tên sản phẩm..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() =>
            setFilter((prev) => (prev === "none" ? "asc" : prev === "asc" ? "desc" : "none"))
          }
        >
          <Ionicons
            name={filter === "asc" ? "arrow-up" : filter === "desc" ? "arrow-down" : "filter"}
            size={20}
            color="#2563EB"
          />
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.product_id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.price}>{item.price.toLocaleString()}₫</Text>
              <Text style={styles.stock}>Tồn kho: {item.stock}</Text>
            </View>

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                style={[styles.addButton, item.stock === 0 && { backgroundColor: "#9CA3AF" }]}
                disabled={item.stock === 0}
                onPress={async () => {
                  animateButton();
                  const success = await addToCart(item.product_id);

                  if (!success) {
                    Toast.show({
                      type: "error",
                      text1: "Hết hàng",
                      text2: item.stock <= 0 ? "Sản phẩm đã hết hàng" : "Vượt số lượng tồn",
                      position: "bottom",
                    });
                    return;
                  }

                  Toast.show({
                    type: "success",
                    text1: "Đã thêm vào giỏ 🎉",
                    text2: item.name,
                    position: "bottom",
                  });
                }}
              >
                <Text style={styles.addButtonText}>
                  {item.stock === 0 ? "Hết hàng" : "Thêm"}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: "#F3F4F6" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 18 },
  title: { fontSize: 22, fontWeight: "700", color: "#111827" },
  cartButton: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 10,
  },
  searchFilterRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
  searchWrap: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: { flex: 1, marginLeft: 8 },
  filterButton: {
    height: 46,
    width: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
  },
  card: {
    flexDirection: "row",
    padding: 18,
    borderRadius: 14,
    backgroundColor: "#fff",
    elevation: 2,
  },
  productName: { fontSize: 17, fontWeight: "600" },
  price: { fontSize: 16, fontWeight: "700", color: "#DC2626", marginTop: 4 },
  stock: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  addButton: {
    backgroundColor: "#10B981",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  addButtonText: { color: "#fff", fontWeight: "600" },
});
