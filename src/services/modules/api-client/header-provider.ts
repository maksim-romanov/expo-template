import * as Application from "expo-application";
import * as Device from "expo-device";
import * as Localization from "expo-localization";
import { Platform } from "react-native";
import { injectable } from "tsyringe";

import { IHeaderProvider } from "./types";

const locales = Localization.getLocales();

export const deviceInfoHeaders = {
  // "X-TravelPortal-DeviceToken": deviceInfo.deviceToken,
  "X-TravelPortal-Model": Device.modelName ?? "",
  "X-TravelPortal-SystemVersion": Device.osVersion ?? "",
  "X-TravelPortal-Version": Application.nativeApplicationVersion ?? "",
  "X-TravelPortal-Build": Application.nativeBuildVersion ?? "",
  "X-TravelPortal-Locale": locales[0].languageCode ?? "",

  "X-TravelPortal-AppIdentifier": Application.applicationId ?? "",
  "X-TravelPortal-Platform": Platform.OS,
};

@injectable()
export class ExpoHeaderProvider implements IHeaderProvider {
  async getHeaders(extra?: Record<string, string>) {
    return { "Content-Type": "application/json", ...deviceInfoHeaders, ...extra };
  }
}
