import { container } from "tsyringe";

import { ApiClient } from "../api-client";
import {
  API_URL,
  ERROR_TRANSFORMER,
  HEADER_PROVIDER,
  REQUEST_TRANSFORMER,
  RESPONSE_TRANSFORMER,
  URL_BUILDER,
} from "../tokens";
import type { IErrorTransformer, IHeaderProvider, IRequestTransformer, IResponseTransformer } from "../types";
import { IUrlBuilder } from "../types";

describe("ApiClient", () => {
  let apiClient: ApiClient;
  let mockFetch: jest.MockedFunction<typeof fetch>;
  const mockBaseUrl = "https://api.example.com";

  const mockRequestTransformer: IRequestTransformer = {
    transformRequest: jest.fn((data) => data),
  };

  const mockResponseTransformer: IResponseTransformer = {
    transformResponse: jest.fn((data) => data),
  };

  const mockErrorTransformer: IErrorTransformer = {
    transformError: jest.fn(),
  };

  const mockHeaderProvider: IHeaderProvider = {
    getHeaders: jest.fn(async () => ({
      "Content-Type": "application/json",
    })),
  };

  const mockUrlBuilder: IUrlBuilder = {
    getUrl: jest.fn((baseUrl, path) => `${baseUrl}/${path.replace(/^\//, "")}`),
    getUrlWithParams: jest.fn((baseUrl, path, params) => {
      const transformedParams = mockRequestTransformer.transformRequest(params);
      const cleanPath = path.replace(/^\//, "");
      return `${baseUrl}/${cleanPath}?${new URLSearchParams(transformedParams as Record<string, string>)}`;
    }),
  };

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Register dependencies
    container.register(API_URL, { useValue: mockBaseUrl });
    container.register(REQUEST_TRANSFORMER, { useValue: mockRequestTransformer });
    container.register(RESPONSE_TRANSFORMER, { useValue: mockResponseTransformer });
    container.register(ERROR_TRANSFORMER, { useValue: mockErrorTransformer });
    container.register(HEADER_PROVIDER, { useValue: mockHeaderProvider });
    container.register(URL_BUILDER, { useValue: mockUrlBuilder });

    // Create instance
    apiClient = container.resolve(ApiClient);

    // Mock global fetch
    mockFetch = jest.spyOn(global, "fetch") as jest.MockedFunction<typeof fetch>;
  });

  it("should make a GET request with correct headers", async () => {
    // Arrange
    const mockResponse = { data: "test" };
    const path = "test-endpoint";

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    // Act
    const result = await apiClient.get(path);

    // Assert
    expect(mockUrlBuilder.getUrlWithParams).toHaveBeenCalledWith(mockBaseUrl, path, {});
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(mockResponseTransformer.transformResponse).toHaveBeenCalledWith(mockResponse);
    expect(mockHeaderProvider.getHeaders).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it("should make a POST request with correct body and headers", async () => {
    // Arrange
    const mockResponse = { success: true };
    const mockRequestBody = { name: "test", value: 123 };
    const path = "create-endpoint";

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    // Act
    const result = await apiClient.post(path, { body: mockRequestBody });

    // Assert
    expect(mockUrlBuilder.getUrl).toHaveBeenCalledWith(mockBaseUrl, path);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockRequestBody),
      }),
    );
    expect(mockRequestTransformer.transformRequest).toHaveBeenCalledWith(mockRequestBody);
    expect(mockResponseTransformer.transformResponse).toHaveBeenCalledWith(mockResponse);
    expect(mockHeaderProvider.getHeaders).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it("should properly handle custom headers in requests", async () => {
    // Arrange
    const mockResponse = { data: "test" };
    const path = "test-endpoint";
    const customHeaders = {
      "X-Custom-Header": "custom-value",
      Authorization: "Bearer test-token",
    };

    (mockHeaderProvider.getHeaders as jest.Mock).mockImplementationOnce(async (extra) => ({
      "Content-Type": "application/json",
      ...extra,
    }));

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    // Act
    const result = await apiClient.get(path, { headers: customHeaders });

    // Assert
    expect(mockHeaderProvider.getHeaders).toHaveBeenCalledWith(customHeaders);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": "custom-value",
          Authorization: "Bearer test-token",
        },
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it("should properly handle error responses", async () => {
    // Arrange
    const path = "error-endpoint";
    const errorResponse = {
      ok: false,
      status: 400,
      statusText: "Bad Request",
      json: () => Promise.resolve({ error: "Invalid request" }),
    };

    mockFetch.mockResolvedValueOnce(errorResponse as Response);

    // Mock error transformer to throw specific error
    const expectedError = new Error("Transformed API error");
    (mockErrorTransformer.transformError as jest.Mock).mockRejectedValueOnce(expectedError);

    // Act & Assert
    await expect(apiClient.get(path)).rejects.toThrow(expectedError);

    // Verify error transformer was called with response
    expect(mockErrorTransformer.transformError).toHaveBeenCalledWith(errorResponse);

    // Verify other expectations
    expect(mockHeaderProvider.getHeaders).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    );
  });

  it("should correctly handle query parameters", async () => {
    // Arrange
    const path = "search";
    const queryParams = {
      name: "test",
      age: 25,
      isActive: true,
      tags: ["tag1", "tag2"],
    };
    const mockResponse = { data: "test" };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    // Act
    const result = await apiClient.get(path, { body: queryParams });

    // Assert
    expect(mockUrlBuilder.getUrlWithParams).toHaveBeenCalledWith(mockBaseUrl, path, queryParams);
    expect(result).toEqual(mockResponse);
  });

  it("should make a DELETE request with body", async () => {
    // Arrange
    const path = "users/123";
    const deleteBody = { reason: "account_closure" };
    const mockResponse = { success: true };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    // Act
    const result = await apiClient.del(path, deleteBody);

    // Assert
    expect(mockUrlBuilder.getUrl).toHaveBeenCalledWith(mockBaseUrl, path);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteBody),
      }),
    );

    expect(mockRequestTransformer.transformRequest).toHaveBeenCalledWith(deleteBody);
    expect(mockResponseTransformer.transformResponse).toHaveBeenCalledWith(mockResponse);
    expect(mockHeaderProvider.getHeaders).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it("should correctly handle nested objects in request body", async () => {
    // Arrange
    const path = "users/profile";
    const complexBody = {
      user: {
        personalInfo: {
          name: "John",
          age: 30,
          address: {
            street: "123 Main St",
            city: "Test City",
            country: "Test Country",
          },
        },
        preferences: {
          theme: "dark",
          notifications: {
            email: true,
            push: false,
          },
        },
      },
    };
    const mockResponse = { success: true };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const transformedBody = {
      "user.personalInfo.name": "John",
      "user.personalInfo.age": 30,
      "user.personalInfo.address.street": "123 Main St",
      "user.personalInfo.address.city": "Test City",
      "user.personalInfo.address.country": "Test Country",
      "user.preferences.theme": "dark",
      "user.preferences.notifications.email": true,
      "user.preferences.notifications.push": false,
    };

    (mockRequestTransformer.transformRequest as jest.Mock).mockReturnValueOnce(transformedBody);

    // Act
    const result = await apiClient.post(path, { body: complexBody });

    // Assert
    expect(mockRequestTransformer.transformRequest).toHaveBeenCalledWith(complexBody);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transformedBody),
      }),
    );
    expect(result).toEqual(mockResponse);
  });
});
