import { container } from "tsyringe";

import { API_URL, REQUEST_TRANSFORMER } from "../tokens";
import { IRequestTransformer } from "../types";
import { NativeUrlBuilder } from "../url-builder";

describe("NativeUrlBuilder", () => {
  let urlBuilder: NativeUrlBuilder;
  const baseUrl = "https://api.example.com";

  // Mock request transformer
  const mockRequestTransformer: IRequestTransformer = {
    transformRequest: jest.fn((params) => params),
  };

  beforeEach(() => {
    // Reset container and register dependencies
    container.clearInstances();
    container.register(API_URL, { useValue: baseUrl });
    container.register(REQUEST_TRANSFORMER, { useValue: mockRequestTransformer });

    // Create instance for testing
    urlBuilder = container.resolve(NativeUrlBuilder);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUrl", () => {
    it("should combine base URL with path", () => {
      const path = "/users";
      const result = urlBuilder.getUrl(baseUrl, path);
      expect(result).toBe("https://api.example.com/users");
    });

    it("should handle path with trailing slash", () => {
      const path = "/users/";
      const result = urlBuilder.getUrl(baseUrl, path);
      expect(result).toBe("https://api.example.com/users/");
    });

    it("should handle empty path", () => {
      const path = "";
      const result = urlBuilder.getUrl(baseUrl, path);
      expect(result).toBe("https://api.example.com/");
    });

    it("should handle path with multiple segments", () => {
      const path = "/api/v1/users/profile";
      const result = urlBuilder.getUrl(baseUrl, path);
      expect(result).toBe("https://api.example.com/api/v1/users/profile");
    });

    it("should handle path with special characters", () => {
      const path = "/users/@me/settings";
      const result = urlBuilder.getUrl(baseUrl, path);
      expect(result).toBe("https://api.example.com/users/@me/settings");
    });

    it("should handle path with encoded characters", () => {
      const path = "/search/John%20Doe";
      const result = urlBuilder.getUrl(baseUrl, path);
      expect(result).toBe("https://api.example.com/search/John%20Doe");
    });

    it("should handle baseUrl with trailing slash", () => {
      const baseUrlWithSlash = "https://api.example.com/";
      const path = "/users";
      const result = urlBuilder.getUrl(baseUrlWithSlash, path);
      expect(result).toBe("https://api.example.com/users");
    });
  });

  describe("getUrlWithParams", () => {
    it("should combine base URL with path and query parameters", () => {
      const path = "/users";
      const params = { id: "123", name: "test" };
      const result = urlBuilder.getUrlWithParams(baseUrl, path, params);
      expect(result).toBe("https://api.example.com/users?id=123&name=test");
      expect(mockRequestTransformer.transformRequest).toHaveBeenCalledWith(params);
    });

    it("should handle empty params", () => {
      const path = "/users";
      const params = {};
      const result = urlBuilder.getUrlWithParams(baseUrl, path, params);
      expect(result).toBe("https://api.example.com/users");
      expect(mockRequestTransformer.transformRequest).toHaveBeenCalledWith(params);
    });

    it("should handle null parameter values", () => {
      const path = "/users";
      const params = { id: "123", name: null as any };
      const result = urlBuilder.getUrlWithParams(baseUrl, path, params);
      expect(result).toBe("https://api.example.com/users?id=123");
      expect(mockRequestTransformer.transformRequest).toHaveBeenCalledWith(params);
    });

    it("should use transformed parameters from request transformer", () => {
      const path = "/users";
      const params = { id: "123" };
      const transformedParams = { transformed_id: "123" };
      (mockRequestTransformer.transformRequest as jest.Mock).mockReturnValueOnce(transformedParams);

      const result = urlBuilder.getUrlWithParams(baseUrl, path, params);
      expect(result).toBe("https://api.example.com/users?transformed_id=123");
      expect(mockRequestTransformer.transformRequest).toHaveBeenCalledWith(params);
    });

    it("should handle parameters with special characters", () => {
      const path = "/search";
      const params = {
        query: "John Doe",
        email: "user@example.com",
        tag: "#special",
      };
      const result = urlBuilder.getUrlWithParams(baseUrl, path, params);
      expect(result).toBe("https://api.example.com/search?query=John+Doe&email=user%40example.com&tag=%23special");
    });

    it("should handle parameters with array-like values", () => {
      const path = "/filter";
      const params = { ids: "1,2,3", tags: "tag1|tag2|tag3" };
      const result = urlBuilder.getUrlWithParams(baseUrl, path, params);
      expect(result).toBe("https://api.example.com/filter?ids=1%2C2%2C3&tags=tag1%7Ctag2%7Ctag3");
    });

    it("should handle parameters with empty strings", () => {
      const path = "/users";
      const params = { name: "", age: "25" };
      const result = urlBuilder.getUrlWithParams(baseUrl, path, params);
      expect(result).toBe("https://api.example.com/users?name=&age=25");
    });

    it("should handle parameters with boolean values", () => {
      const path = "/settings";
      const params = { enabled: "true", visible: "false" };
      const result = urlBuilder.getUrlWithParams(baseUrl, path, params);
      expect(result).toBe("https://api.example.com/settings?enabled=true&visible=false");
    });

    it("should handle path with existing query parameters", () => {
      const path = "/search?sort=desc";
      const params = { query: "test" };
      const result = urlBuilder.getUrlWithParams(baseUrl, path, params);
      expect(result).toBe("https://api.example.com/search?sort=desc&query=test");
    });
  });
});
