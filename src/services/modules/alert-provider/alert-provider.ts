import { Alert } from "react-native";
import { inject, injectable } from "tsyringe";

import { ILinkingProvider, LINKING_PROVIDER } from "../linking-provider";

export interface IAlertProvider {
  alertToOpenSettings(title: string, message?: string): Promise<void>;
  error(title: string, message: string): Promise<void>;
  info(title: string, message: string): Promise<void>;
  confirm(title: string, message: string): Promise<boolean>;
}

@injectable()
export class ReactNativeAlertProvider implements IAlertProvider {
  constructor(@inject(LINKING_PROVIDER) private readonly linking: ILinkingProvider) {}

  async alertToOpenSettings(title: string, message?: string) {
    return Alert.alert(title, message, [
      { text: "Cancel", style: "cancel" },
      { text: "Go to Settings", onPress: () => this.linking.openSettings() },
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
