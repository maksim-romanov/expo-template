import { Alert } from "react-native";
import { inject, injectable } from "tsyringe";

import { TOKENS } from "modules/container/tokens";

import { type ILinkingManager } from "../linking-manager/linking-manager";

export interface IAlertManager {
  alertToOpenSettings(title: string, message?: string): Promise<void>;
  error(title: string, message: string): Promise<void>;
  info(title: string, message: string): Promise<void>;
  confirm(title: string, message: string): Promise<boolean>;
}

@injectable()
export class ReactNativeAlertManager implements IAlertManager {
  constructor(@inject(TOKENS.LINKING_MANAGER) private readonly linkingManager: ILinkingManager) {}

  async alertToOpenSettings(title: string, message?: string) {
    return Alert.alert(title, message, [
      { text: "Cancel", style: "cancel" },
      { text: "Go to Settings", onPress: () => this.linkingManager.openSettings() },
    ]);
  }

  async confirm(title: string, message: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      Alert.alert(title, message, [
        { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
        { text: "OK", onPress: () => resolve(true) },
      ]);
    });
  }

  async error(title: string, message: string) {
    return Alert.alert(title, message, [{ text: "OK", style: "cancel" }]);
  }

  async info(title: string, message: string) {
    return Alert.alert(title, message, [{ text: "OK" }]);
  }
}
