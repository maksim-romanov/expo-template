import { container } from "tsyringe";

import { ALERT_PROVIDER, IAlertProvider } from "services/modules/alert-provider";

import { ExpoUpdateService } from "../app-update.service";
import { ExpoUpdater } from "../store-provider";

// Interface for mocking the updater
interface IUpdater {
  needUpdate: () => Promise<boolean>;
  updateApp: () => Promise<void>;
}

describe("ExpoUpdateService", () => {
  let service: ExpoUpdateService;
  let mockUpdater: jest.Mocked<IUpdater>;
  let mockAlert: jest.Mocked<IAlertProvider>;

  beforeEach(() => {
    // Create mock implementations
    mockUpdater = {
      needUpdate: jest.fn(),
      updateApp: jest.fn(),
    };

    mockAlert = {
      confirm: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      alertToOpenSettings: jest.fn(),
    };

    // Register mocks in the container
    container.registerInstance(ExpoUpdater, mockUpdater as any);
    container.registerInstance(ALERT_PROVIDER, mockAlert);

    // Create service instance
    service = container.resolve(ExpoUpdateService);
  });

  afterEach(() => {
    // Clear all mocks between tests
    jest.clearAllMocks();
    container.clearInstances();
  });

  describe("checkForUpdate", () => {
    it("should not show alert if no update is needed", async () => {
      // Arrange
      mockUpdater.needUpdate.mockResolvedValue(false);

      // Act
      await service.checkForUpdate();

      // Assert
      expect(mockUpdater.needUpdate).toHaveBeenCalledTimes(1);
      expect(mockAlert.confirm).not.toHaveBeenCalled();
      expect(mockUpdater.updateApp).not.toHaveBeenCalled();
    });

    it("should show alert and update app when update is needed and user confirms", async () => {
      // Arrange
      mockUpdater.needUpdate.mockResolvedValue(true);
      mockAlert.confirm.mockResolvedValue(true);
      mockUpdater.updateApp.mockResolvedValue();

      // Act
      await service.checkForUpdate();

      // Assert
      expect(mockUpdater.needUpdate).toHaveBeenCalledTimes(1);
      expect(mockAlert.confirm).toHaveBeenCalledWith("New version is available", "Update now?");
      expect(mockUpdater.updateApp).toHaveBeenCalledTimes(1);
    });

    it("should not update app when user declines the update", async () => {
      // Arrange
      mockUpdater.needUpdate.mockResolvedValue(true);
      mockAlert.confirm.mockResolvedValue(false);

      // Act
      await service.checkForUpdate();

      // Assert
      expect(mockUpdater.needUpdate).toHaveBeenCalledTimes(1);
      expect(mockAlert.confirm).toHaveBeenCalledWith("New version is available", "Update now?");
      expect(mockUpdater.updateApp).not.toHaveBeenCalled();
    });

    it("should handle errors from needUpdate gracefully", async () => {
      // Arrange
      const error = new Error("Network error");
      mockUpdater.needUpdate.mockRejectedValue(error);

      // Act & Assert
      await expect(service.checkForUpdate()).rejects.toThrow(error);
      expect(mockAlert.confirm).not.toHaveBeenCalled();
      expect(mockUpdater.updateApp).not.toHaveBeenCalled();
    });

    it("should handle errors from updateApp gracefully", async () => {
      // Arrange
      mockUpdater.needUpdate.mockResolvedValue(true);
      mockAlert.confirm.mockResolvedValue(true);
      const error = new Error("Update failed");
      mockUpdater.updateApp.mockRejectedValue(error);

      // Act & Assert
      await expect(service.checkForUpdate()).rejects.toThrow(error);
    });
  });
});
