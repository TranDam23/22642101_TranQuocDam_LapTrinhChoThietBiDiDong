// utils/fileUtils.ts
import * as FileSystem from "expo-file-system/legacy";

const DOC_DIR = (FileSystem as any).documentDirectory ?? ""; // nếu web sẽ là ""
export const EDITED_DIR = DOC_DIR + "edited_images/";

/**
 * Đảm bảo thư mục edited_images tồn tại.
 */
export async function ensureEditedDirExists(): Promise<void> {
  try {
    if (!DOC_DIR) return; // trên web không có documentDirectory
    const info = await FileSystem.getInfoAsync(EDITED_DIR);
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(EDITED_DIR, { intermediates: true });
    }
  } catch (err) {
    console.warn("ensureEditedDirExists error:", err);
  }
}

/**
 * Lấy danh sách file đã lưu (trả về các uri đầy đủ).
 */
export async function getEditedImages(): Promise<string[]> {
  try {
    if (!DOC_DIR) return []; // web: trả về rỗng
    await ensureEditedDirExists();
    const files = await FileSystem.readDirectoryAsync(EDITED_DIR);
    // trả về các uri đầy đủ (thêm EDITED_DIR vào tên file)
    return files.map((f) => EDITED_DIR + f);
  } catch (err) {
    console.warn("getEditedImages error:", err);
    return [];
  }
}

/**
 * Lưu file (copy từ uri tạm đến edited dir) — trả về uri mới hoặc null
 */
export async function saveEditedImage(tempUri: string): Promise<string | null> {
  try {
    if (!DOC_DIR) return null;
    await ensureEditedDirExists();
    const fileName = `${Date.now()}.png`;
    const dest = `${EDITED_DIR}${fileName}`;
    await FileSystem.copyAsync({ from: tempUri, to: dest });
    return dest;
  } catch (err) {
    console.error("saveEditedImage error:", err);
    return null;
  }
}
