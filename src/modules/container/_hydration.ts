import { configurePersistable } from "mobx-persist-store";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

configurePersistable({
  // debugMode: __DEV__,
  storage: {
    setItem: (key, data) => storage.set(key, data),
    getItem: (key) => storage.getString(key) || null,
    removeItem: (key) => storage.delete(key),
  },
});
