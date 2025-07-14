// import { AppUpdateAvailableModal } from "components/modals/app-update-available";
import { container } from "tsyringe";

// import { MODAL_MANAGER } from "services/modules/modal-manager";

import { StoreUpdateService } from "../app-update.service";
import { AppUpdateStore } from "../app-update.store";
import { StoreVersionCheckUpdater } from "../store-provider";

describe("StoreUpdateService", () => {
  let service: StoreUpdateService;
  let updater: jest.Mocked<StoreVersionCheckUpdater>;
  let store: jest.Mocked<AppUpdateStore>;
  // let modalManager: jest.Mocked<any>;

  beforeEach(() => {
    updater = {
      needUpdate: jest.fn(),
      updateApp: jest.fn(),
    } as any;

    store = {
      get isStale() {
        return true;
      },
      setAsNotified: jest.fn(),
      hydrate: jest.fn(),
    } as any;

    // modalManager = {
    //   showBottomSheet: jest.fn(),
    // };

    container.clearInstances();
    container.register(StoreVersionCheckUpdater, { useValue: updater });
    container.register(AppUpdateStore, { useValue: store });
    // container.register(MODAL_MANAGER, { useValue: modalManager });

    service = container.resolve(StoreUpdateService);
  });

  describe("update flow", () => {
    it("should check for updates and update app when update is needed", async () => {
      // Arrange
      updater.needUpdate.mockResolvedValue(true);

      // Act
      await service.checkForUpdate();

      // Assert
      expect(updater.needUpdate).toHaveBeenCalled();
      expect(store.setAsNotified).toHaveBeenCalled();
      expect(updater.updateApp).toHaveBeenCalled();
    });

    it("should not proceed with update flow when app is not stale", async () => {
      // Arrange
      const mockStore = {
        get isStale() {
          return false;
        },
        setAsNotified: jest.fn(),
        hydrate: jest.fn(),
      } as any;

      container.clearInstances();
      container.register(StoreVersionCheckUpdater, { useValue: updater });
      container.register(AppUpdateStore, { useValue: mockStore });
      const testService = container.resolve(StoreUpdateService);

      // Act
      await testService.checkForUpdate();

      // Assert
      expect(updater.needUpdate).not.toHaveBeenCalled();
      expect(mockStore.setAsNotified).not.toHaveBeenCalled();
      expect(updater.updateApp).not.toHaveBeenCalled();
    });

    it("should not update app when no update is needed", async () => {
      // Arrange
      updater.needUpdate.mockResolvedValue(false);

      // Act
      await service.checkForUpdate();

      // Assert
      expect(updater.needUpdate).toHaveBeenCalled();
      expect(store.setAsNotified).not.toHaveBeenCalled();
      expect(updater.updateApp).not.toHaveBeenCalled();
    });

    it("should verify correct order of operations in update flow", async () => {
      // Arrange
      updater.needUpdate.mockResolvedValue(true);

      const operations: string[] = [];
      updater.needUpdate.mockImplementation(() => {
        operations.push("needUpdate");
        return Promise.resolve(true);
      });
      store.setAsNotified.mockImplementation(() => {
        operations.push("setAsNotified");
      });
      updater.updateApp.mockImplementation(() => {
        operations.push("updateApp");
        return Promise.resolve();
      });

      // Act
      await service.checkForUpdate();

      // Assert
      expect(operations).toEqual(["needUpdate", "setAsNotified", "updateApp"]);
    });
  });

  describe("error handling", () => {
    it("should throw error when needUpdate fails", async () => {
      // Arrange
      const error = new Error("Network error");
      updater.needUpdate.mockRejectedValue(error);

      // Act & Assert
      await expect(service.checkForUpdate()).rejects.toThrow(error);
    });

    it("should throw error when updateApp fails", async () => {
      // Arrange
      const error = new Error("Failed to update app");
      updater.needUpdate.mockResolvedValue(true);
      updater.updateApp.mockRejectedValue(error);

      // Act & Assert
      await expect(service.checkForUpdate()).rejects.toThrow(error);
    });
  });
});
