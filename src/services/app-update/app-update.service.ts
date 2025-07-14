import { inject, singleton } from "tsyringe";

import { ALERT_PROVIDER, IAlertProvider } from "services/modules/alert-provider";

import { AppUpdateStore } from "./app-update.store";
import { ExpoUpdater, StoreVersionCheckUpdater } from "./store-provider";

export interface IAppUpdateService extends Service {
  checkForUpdate: () => Promise<void>;
}

@singleton()
export class StoreUpdateService implements IAppUpdateService {
  constructor(
    @inject(AppUpdateStore) private readonly store: AppUpdateStore,
    @inject(StoreVersionCheckUpdater) private readonly updater: StoreVersionCheckUpdater,
    // @inject(MODAL_MANAGER) private readonly modalManager: IModalManager,
  ) {}

  async init() {
    await this.store.hydrate?.();
  }

  async checkForUpdate() {
    if (!this.store.isStale) return;

    const isUpdateNeeded = await this.updater.needUpdate();
    if (!isUpdateNeeded) return;

    this.store.setAsNotified();
    // const confirmed = await this.modalManager.showBottomSheet<TAppUpdateAvailableModal>(AppUpdateAvailableModal);
    // if (!confirmed) return;

    await this.updater.updateApp();
  }
}

@singleton()
export class ExpoUpdateService implements IAppUpdateService {
  constructor(
    @inject(ExpoUpdater) private readonly updater: ExpoUpdater,
    @inject(ALERT_PROVIDER) private readonly alert: IAlertProvider,
  ) {}

  init() {}

  async checkForUpdate() {
    const isUpdateNeeded = await this.updater.needUpdate();
    if (!isUpdateNeeded) return;

    const confirmed = await this.alert.confirm("New version is available", "Update now?");
    if (!confirmed) return;

    await this.updater.updateApp();
  }
}
