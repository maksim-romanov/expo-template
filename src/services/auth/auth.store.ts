import { makeAutoObservable } from "mobx";
import { injectable } from "tsyringe";

@injectable()
export class AuthStore {
  isAuthenticated = false;

  setIsAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
