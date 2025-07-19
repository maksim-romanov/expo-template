import * as SecureStore from "expo-secure-store";
import { singleton } from "tsyringe";

type TokenPayload = {
  accessToken: string;
  refreshToken: string;
};

export interface ITokensRepository {
  save(tokens: TokenPayload): Promise<void>;
  clear(): Promise<void>;
  getAccessToken(): Promise<Nullable<TokenPayload["accessToken"]>>;
  getRefreshToken(): Promise<Nullable<TokenPayload["refreshToken"]>>;
}

@singleton()
export class SecureTokensRepository implements ITokensRepository {
  static readonly keys = {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  };

  static readonly options: SecureStore.SecureStoreOptions = {
    keychainAccessible: SecureStore.WHEN_UNLOCKED,
  };

  private accessToken: Nullable<string> = null;
  private refreshToken: Nullable<string> = null;

  async save({ accessToken, refreshToken }: TokenPayload): Promise<void> {
    await Promise.all([
      SecureStore.setItemAsync(SecureTokensRepository.keys.accessToken, accessToken, SecureTokensRepository.options),
      SecureStore.setItemAsync(SecureTokensRepository.keys.refreshToken, refreshToken, SecureTokensRepository.options),
    ]);

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  async clear(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync(SecureTokensRepository.keys.accessToken),
      SecureStore.deleteItemAsync(SecureTokensRepository.keys.refreshToken),
    ]);

    this.accessToken = null;
    this.refreshToken = null;
  }

  async getAccessToken(): Promise<Nullable<string>> {
    if (!this.accessToken) {
      const accessToken = await SecureStore.getItemAsync(SecureTokensRepository.keys.accessToken);
      this.accessToken = accessToken;
    }

    return this.accessToken;
  }

  async getRefreshToken(): Promise<Nullable<string>> {
    if (!this.refreshToken) {
      const refreshToken = await SecureStore.getItemAsync(SecureTokensRepository.keys.refreshToken);
      this.refreshToken = refreshToken;
    }

    return this.refreshToken;
  }
}
