import * as ExpoLinking from "expo-linking";
import { injectable } from "tsyringe";

export interface ILinkingManager {
  openURL(url: string): Promise<void>;
  canOpenURL(url: string): Promise<boolean>;
  createURL(path: string): string;

  openSettings(): Promise<void>;
}

@injectable()
export class ExpoLinkingManager implements ILinkingManager {
  async openURL(url: string): Promise<void> {
    await ExpoLinking.openURL(url);
  }

  async canOpenURL(url: string): Promise<boolean> {
    return ExpoLinking.canOpenURL(url);
  }

  createURL(path: string): string {
    return ExpoLinking.createURL(path);
  }

  async openSettings(): Promise<void> {
    await ExpoLinking.openSettings();
  }
}
