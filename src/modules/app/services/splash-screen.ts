import { SplashScreen } from "expo-router";
import { singleton } from "tsyringe";

interface ISplashScreenService {
  hide: () => Promise<void>;
}

@singleton()
export class SplashScreenService implements ISplashScreenService {
  async hide() {
    await SplashScreen.hideAsync();
  }
}
