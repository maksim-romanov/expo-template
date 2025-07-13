import * as ExpoLinking from "expo-linking";

import { ExpoLinkingProvider } from "../linking-provider";

jest.mock("expo-linking");

describe("ExpoLinkingProvider", () => {
  let provider: ExpoLinkingProvider;
  let mockExpoLinking: jest.Mocked<typeof ExpoLinking>;

  beforeEach(() => {
    mockExpoLinking = ExpoLinking as jest.Mocked<typeof ExpoLinking>;
    provider = new ExpoLinkingProvider();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("openURL", () => {
    it("should call ExpoLinking.openURL with the provided URL", async () => {
      const url = "https://example.com";
      mockExpoLinking.openURL.mockResolvedValue(true);

      await provider.openURL(url);

      expect(mockExpoLinking.openURL).toHaveBeenCalledWith(url);
    });

    it("should throw error when ExpoLinking.openURL fails", async () => {
      const url = "https://example.com";
      const error = new Error("Failed to open URL");
      mockExpoLinking.openURL.mockRejectedValue(error);

      await expect(provider.openURL(url)).rejects.toThrow(error);
    });
  });

  describe("canOpenURL", () => {
    it("should call ExpoLinking.canOpenURL with the provided URL", async () => {
      const url = "https://example.com";
      mockExpoLinking.canOpenURL.mockResolvedValue(true);

      const result = await provider.canOpenURL(url);

      expect(mockExpoLinking.canOpenURL).toHaveBeenCalledWith(url);
      expect(result).toBe(true);
    });

    it("should return false when URL cannot be opened", async () => {
      const url = "invalid://url";
      mockExpoLinking.canOpenURL.mockResolvedValue(false);

      const result = await provider.canOpenURL(url);

      expect(mockExpoLinking.canOpenURL).toHaveBeenCalledWith(url);
      expect(result).toBe(false);
    });
  });

  describe("createURL", () => {
    it("should call ExpoLinking.createURL with the provided path", () => {
      const path = "/test/path";
      const expectedUrl = "exp://test/path";
      mockExpoLinking.createURL.mockReturnValue(expectedUrl);

      const result = provider.createURL(path);

      expect(mockExpoLinking.createURL).toHaveBeenCalledWith(path);
      expect(result).toBe(expectedUrl);
    });
  });
});
