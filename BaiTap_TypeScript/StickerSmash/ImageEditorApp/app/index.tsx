// app/index.tsx
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StickerSelector from "../components/StickerSelector";
import { getEditedImages, saveEditedImage } from "../utils/fileUtils";

const { width } = Dimensions.get("window");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const refreshList = async () => {
    const list = await getEditedImages();
    setImages(list);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log("Đường dẫn ảnh:", result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!selectedImage) return;
    try {
      // thao tác ví dụ: resize, bạn có thể thêm sticker xử lý trước
      const manipulated = await manipulateAsync(
        selectedImage,
        [{ resize: { width: 500 } }],
        { compress: 1, format: SaveFormat.PNG }
      );

      const saved = await saveEditedImage(manipulated.uri);
      if (saved) {
        Alert.alert("✅ Đã lưu", "Ảnh đã được lưu vào bộ nhớ ứng dụng.");
        setSelectedImage(null);
        refreshList();
      } else {
        Alert.alert("❌ Lỗi", "Không thể lưu ảnh.");
      }
    } catch (err) {
      console.error("handleSave error:", err);
      Alert.alert("❌ Lỗi", "Không thể xử lý ảnh.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🖼️ Ứng dụng chỉnh sửa ảnh</Text>

      {!selectedImage ? (
        <>
          <Button title="📁 Chọn ảnh từ thư viện" onPress={pickImage} />
          <Text style={styles.subtitle}>📷 Ảnh đã chỉnh sửa:</Text>
          {images.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 10 }}>Chưa có ảnh chỉnh sửa nào</Text>
          ) : (
            <FlatList
              data={images}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Image source={{ uri: item }} style={styles.thumb} />}
              numColumns={3}
            />
          )}
        </>
      ) : (
        <View style={styles.editorContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} resizeMode="contain" />
          <StickerSelector onSelect={setSelectedSticker} />
          <Button title="💾 Lưu ảnh đã chỉnh sửa" onPress={handleSave} />
          <Button title="↩️ Quay lại" color="gray" onPress={() => setSelectedImage(null)} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 16, marginVertical: 10 },
  editorContainer: { alignItems: "center", marginVertical: 10 },
  image: { width: width - 40, height: width - 40, borderRadius: 10, marginBottom: 10 },
  thumb: { width: 100, height: 100, margin: 5, borderRadius: 10 },
});
