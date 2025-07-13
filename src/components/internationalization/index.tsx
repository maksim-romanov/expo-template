import React, { use } from "react";

import { i18n, Messages } from "@lingui/core";
import { I18nProvider, TransRenderProps } from "@lingui/react";
import { Text } from "react-native";

const defaultLocale = "en";
const localeFiles: Record<string, () => Promise<{ messages: Messages }>[]> = {
  en: () => [import("locales/en/app.po"), import("locales/en/components.po")],
  cs: () => [import("locales/cs/app.po"), import("locales/cs/components.po")],
};

async function loadCatalogs(locale: string) {
  const getLocales = localeFiles[locale] ?? localeFiles[defaultLocale]!;
  const catalogs = await Promise.all(getLocales());
  return Object.assign({}, ...catalogs.map((catalog) => catalog.messages));
}

async function dynamicActivate(locale: string) {
  i18n.load(locale, await loadCatalogs(locale));
  i18n.activate(locale);
}

const DefaultComponent = (props: TransRenderProps) => {
  return <Text>{props.children}</Text>;
};

const dynamicActivatePromise = dynamicActivate("en");

export const I18nWrapper = function ({ children }: React.PropsWithChildren) {
  use(dynamicActivatePromise);

  return (
    <I18nProvider i18n={i18n} defaultComponent={DefaultComponent}>
      {children}
    </I18nProvider>
  );
};
