import { ThemeModeColor } from "@root/utils";

export function thirdPartyStyles(): any {
  return {
    wrapper: {
      padding: 2.4,
      border: "1px solid",
      borderColor: "neutral.200",
      borderRadius: "8px",
    },
    title: () => ({
      mt: 2.4,
      mb: 0.8,
      textTransform: "capitalize",
      color: ThemeModeColor("neutral.700"),
    }),
    description: {
      mb: 1.6,
    },
    btn: {
      textTransform: "capitalize",
      fontSize: "1.4rem"
    },
  };
}
