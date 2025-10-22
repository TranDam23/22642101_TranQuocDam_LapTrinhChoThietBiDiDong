import * as domtoimage from "dom-to-image";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import React, { useRef, useState } from "react";
import { Alert, Button, Dimensions, Image, Platform, StyleSheet, View } from "react-native";
import { captureRef } from "react-native-view-shot";
import StickerSelector from "./StickerSelector";

const { width } = Dimensions.get("window");
const EDITED_DIR = `${(FileSystem as any).documentDirectory}edited_images/`;

interface Props {
  imageUri: string;
  onSaved: () => void;
}

const ImageList: React.FC<Props> = ({ imageUri, onSaved }) => {
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const imageRef = useRef<View>(null);

  const handleSave = async () => {
    if (Platform.OS !== "web") {
      try {
        // ✅ Tạo thư mục nếu chưa có
        const dirInfo = await FileSystem.getInfoAsync(EDITED_DIR);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(EDITED_DIR, { intermediates: true });
        }

        // ✅ Chụp view hiện tại
        const localUri = await captureRef(imageRef, { height: 440, quality: 1 });
        await MediaLibrary.saveToLibraryAsync(localUri);

        Alert.alert("✅ Thành công", "Ảnh đã được lưu vào thư viện!");
        onSaved();
      } catch (e) {
        console.error("❌ Lưu thất bại:", e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current!, {
          quality: 0.95,
          width: 320,
          height: 440,
        });
        const link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
        alert("✅ Ảnh đã được tải xuống!");
      } catch (e) {
        console.error("❌ Lưu thất bại:", e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View ref={imageRef} collapsable={false}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      </View>
      <StickerSelector onSelect={setSelectedSticker} />
      <Button title="💾 Lưu ảnh đã chỉnh sửa" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginVertical: 10 },
  image: { width: width - 40, height: width - 40, borderRadius: 10, marginBottom: 10 },
});

export default ImageList;
