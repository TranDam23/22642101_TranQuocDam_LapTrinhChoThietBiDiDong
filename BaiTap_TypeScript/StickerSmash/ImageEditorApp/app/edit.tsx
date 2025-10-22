import * as FileSystem from "expo-file-system";
import React, { useRef, useState } from "react";
import { Alert, Button, Image, StyleSheet, View } from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";

// 🔧 Hàm tiện ích để lấy thư mục document
const getDocumentDir = (): string => {
  return (FileSystem as any).documentDirectory as string;
};

// 🔧 Hàm tạo đường dẫn file ảnh mới
const getEditedImageUri = (): string => {
  return `${getDocumentDir()}edited/${Date.now()}.jpg`;
};

export default function EditScreen({ route }: any) {
  const { imageUri } = route.params;
  const viewRef = useRef<ViewShot>(null);
  const [stickers, setStickers] = useState<string[]>([]); // sau này dùng để dán sticker

  // ✅ Hàm lưu ảnh đã chỉnh sửa
  const saveImage = async () => {
    try {
      if (!viewRef.current) {
        Alert.alert("Lỗi", "Không thể chụp ảnh.");
        return;
      }

      // Chụp ảnh màn hình của ViewShot
      const uri = await captureRef(viewRef, {
        format: "jpg",
        quality: 1,
      });

      // Đảm bảo thư mục 'edited' tồn tại
      const editedDir = `${getDocumentDir()}edited`;
      const dirInfo = await FileSystem.getInfoAsync(editedDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(editedDir, { intermediates: true });
      }

      // Tạo đường dẫn file mới và di chuyển ảnh
      const newUri = getEditedImageUri();
      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });

      Alert.alert("✅ Thành công", "Ảnh đã được lưu!");
      console.log("Saved at:", newUri);
    } catch (error) {
      console.error("❌ Lỗi khi lưu ảnh:", error);
      Alert.alert("Lỗi", "Không thể lưu ảnh.");
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={viewRef} style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
        {/* Ở đây sau này bạn có thể render sticker lên */}
      </ViewShot>

      <Button title="💾 Lưu ảnh đã chỉnh sửa" onPress={saveImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  imageContainer: {
    width: "100%",
    height: "80%",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
