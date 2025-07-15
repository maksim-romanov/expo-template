import { APIError } from "types/models/api-error";

import { HumpsErrorTransformer } from "../error-transformer";

describe("HumpsErrorTransformer", () => {
  let errorTransformer: HumpsErrorTransformer;

  beforeEach(() => {
    errorTransformer = new HumpsErrorTransformer();
  });

  it("should transform error with field error", async () => {
    const mockResponse = {
      status: 400,
      json: () =>
        Promise.resolve({
          error: "Validation error",
          field_error: ["email", "Invalid email format"],
        }),
    };

    await expect(errorTransformer.transformError(mockResponse)).rejects.toThrow(APIError);
    await expect(errorTransformer.transformError(mockResponse)).rejects.toMatchObject({
      status: 400,
      message: "Validation error",
      field: { email: "Invalid email format" },
    });
  });

  it("should transform error without field error", async () => {
    const mockResponse = {
      status: 500,
      json: () =>
        Promise.resolve({
          error: "Internal server error",
        }),
    };

    await expect(errorTransformer.transformError(mockResponse)).rejects.toThrow(APIError);
    await expect(errorTransformer.transformError(mockResponse)).rejects.toMatchObject({
      status: 500,
      message: "Internal server error",
      field: {},
    });
  });

  it("should handle invalid JSON response", async () => {
    const mockResponse = {
      status: 400,
      json: () => Promise.reject(new Error("Invalid JSON")),
    };

    await expect(errorTransformer.transformError(mockResponse)).rejects.toThrow(APIError);
    await expect(errorTransformer.transformError(mockResponse)).rejects.toMatchObject({
      status: 400,
      field: {},
    });
  });
});
