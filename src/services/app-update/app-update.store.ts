import { differenceInHours, parseISO } from "date-fns";
import { makeAutoObservable } from "mobx";
import { hydrateStore, makePersistable } from "mobx-persist-store";
import { singleton } from "tsyringe";

@singleton()
export class AppUpdateStore {
  static sateTime = 24; // hours

  notifiedAt: Nullable<string> = null;

  get isStale() {
    if (!this.notifiedAt) return true;
    return differenceInHours(new Date(), this.notifiedAtDate) >= AppUpdateStore.sateTime;
  }

  setAsNotified() {
    this.notifiedAt = new Date().toISOString();
  }

  get notifiedAtDate(): Date {
    if (!this.notifiedAt) return new Date();
    return parseISO(this.notifiedAt);
  }

  hydrate = async () => {
    await hydrateStore(this);
  };

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: AppUpdateStore.name,
      properties: ["notifiedAt"],
    });
  }
}
