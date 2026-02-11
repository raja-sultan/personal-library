import { useContext } from "react";

import { SettingsContext } from "common/context";
import type { SettingsContextType } from "common/types";

export const useSettings = (): SettingsContextType =>
  useContext(SettingsContext);
