import * as Updates from "expo-updates";
import { DevSettings } from "react-native";
import VersionCheck from "react-native-version-check";
import { inject, singleton } from "tsyringe";

import { ILinkingProvider, LINKING_PROVIDER } from "services/modules/linking-provider";
import { IToastProvider, TOAST_PROVIDER } from "services/modules/toast-provider";

@singleton()
export class StoreVersionCheckUpdater {
  constructor(@inject(LINKING_PROVIDER) private readonly linking: ILinkingProvider) {}

  async updateApp() {
    const { storeUrl } = await VersionCheck.needUpdate();
    await this.linking.openURL(storeUrl);
  }

  async needUpdate() {
    const { isNeeded } = await VersionCheck.needUpdate();
    return isNeeded;
  }
}

@singleton()
export class ExpoUpdater {
  constructor(@inject(TOAST_PROVIDER) private readonly toaster: IToastProvider) {}

  async updateApp() {
    try {
      this.toaster.loading(Updates.fetchUpdateAsync());
      await Updates.reloadAsync();
    } finally {
      DevSettings.reload();
    }
  }

  async needUpdate() {
    if (!Updates.isEnabled || __DEV__) return false;

    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) Updates.fetchUpdateAsync(); // force background update
    return update.isAvailable;
  }
}
