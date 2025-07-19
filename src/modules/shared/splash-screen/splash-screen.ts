import { SplashScreen as ExpoSplashScreen } from "expo-router";
import { singleton } from "tsyringe";

interface ISplashScreen {
  hide: () => Promise<void>;
}

@singleton()
export class SplashScreen implements ISplashScreen {
  async hide() {
    await ExpoSplashScreen.hideAsync();
  }
}
