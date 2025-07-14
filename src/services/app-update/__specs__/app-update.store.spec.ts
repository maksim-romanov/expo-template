import { parseISO } from "date-fns";

import { AppUpdateStore } from "../app-update.store";

describe("AppUpdateStore", () => {
  let store: AppUpdateStore;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    store = new AppUpdateStore();
  });

  describe("isStale", () => {
    it("should return true when notifiedAt is null", () => {
      store.notifiedAt = null;
      expect(store.isStale).toBe(true);
    });

    it("should return true when last notification was more than 24 hours ago", () => {
      // Set notification time to 25 hours ago
      const date = new Date();
      date.setHours(date.getHours() - 25);
      store.notifiedAt = date.toISOString();

      expect(store.isStale).toBe(true);
    });

    it("should return false when last notification was less than 24 hours ago", () => {
      // Set notification time to 23 hours ago
      const date = new Date();
      date.setHours(date.getHours() - 23);
      store.notifiedAt = date.toISOString();

      expect(store.isStale).toBe(false);
    });
  });

  describe("setAsNotified", () => {
    it("should update notifiedAt with current timestamp", () => {
      const before = new Date();
      store.setAsNotified();
      const after = new Date();

      const notifiedAt = parseISO(store.notifiedAt!);
      expect(notifiedAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(notifiedAt.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe("notifiedAtDate", () => {
    it("should return current date when notifiedAt is null", () => {
      store.notifiedAt = null;
      const result = store.notifiedAtDate;
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    it("should return parsed date when notifiedAt is set", () => {
      const testDate = "2024-03-20T12:00:00.000Z";
      store.notifiedAt = testDate;
      expect(store.notifiedAtDate).toEqual(parseISO(testDate));
    });
  });
});
