import { UnistylesBreakpoints, UnistylesRuntime, useUnistyles } from "react-native-unistyles";

export const useMinBreakpoint = (breakpoint: keyof UnistylesBreakpoints) => {
  const unistyles = useUnistyles();
  return UnistylesRuntime.breakpoints[unistyles.rt.breakpoint!] >= UnistylesRuntime.breakpoints[breakpoint];
};
