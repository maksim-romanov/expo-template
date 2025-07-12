import { makeAutoObservable } from "mobx";
import { injectable } from "tsyringe";

@injectable()
export class AuthStore {
  isLoading = false;
  isAuthenticated = false;

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
  }

  constructor() {
    makeAutoObservable(this);
  }
}
