import { makeAutoObservable } from "mobx";
import { hydrateStore, makePersistable } from "mobx-persist-store";
import { singleton } from "tsyringe";

@singleton()
export class AuthStore implements Store {
  isAuthenticated = false;

  setIsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: AuthStore.name,
      properties: ["isAuthenticated"],
    });
  }

  async hydrate() {
    await hydrateStore(this);
  }
}
