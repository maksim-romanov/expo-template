import "reflect-metadata";

// Mock expo environment
global.__ExpoImportMetaRegistry = {};

// Mock mobx-persist-store
jest.mock("mobx-persist-store", () => ({
  hydrateStore: jest.fn(),
  makePersistable: jest.fn(),
}));
