import { Trans } from "@lingui/react/macro";

import { ThemedText } from "components/ThemedText";

import { ScreenModal } from "./shared/modal";

export const Options = function () {
  return (
    <ScreenModal>
      <ThemedText>
        <Trans>Options</Trans>
      </ThemedText>
    </ScreenModal>
  );
};
