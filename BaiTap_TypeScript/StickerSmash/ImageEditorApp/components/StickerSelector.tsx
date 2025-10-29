// components/StickerSelector.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const STICKERS = ["😎", "🌸", "🔥", "❤️", "🎉", "⭐"];

export default function StickerSelector({ onSelect }: { onSelect: (s: string) => void }) {
  return (
    <View style={styles.container}>
      {STICKERS.map((s) => (
        <TouchableOpacity key={s} onPress={() => onSelect(s)} style={styles.item}>
          <Text style={styles.text}>{s}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginVertical: 10 },
  item: { backgroundColor: "#f1f1f1", padding: 8, borderRadius: 8, margin: 5 },
  text: { fontSize: 24 },
});
