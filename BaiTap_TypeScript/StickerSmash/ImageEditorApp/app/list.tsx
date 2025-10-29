import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";

type RootStackParamList = {
  Edit: { imageUri: string };
  Home: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export default function ImageList() {
  const [images, setImages] = useState<string[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    (async () => {
      try {
        const dir = `${(FileSystem as any).documentDirectory}edited/`;
        const dirInfo = await FileSystem.getInfoAsync(dir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
        }
        const files = await FileSystem.readDirectoryAsync(dir);
        setImages(files.map((f) => dir + f));
      } catch (error) {
        console.error("Lỗi khi đọc thư mục ảnh:", error);
      }
    })();
  }, []);

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Edit", { imageUri: item })}>
          <Image source={{ uri: item }} style={{ width: 100, height: 100, margin: 5, borderRadius: 8 }} />
        </TouchableOpacity>
      )}
      numColumns={3}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}
