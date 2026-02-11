import { useTheme } from "@mui/material";

export const useThemeColor = (): any => {
  const theme = useTheme();

  const getContrastColor = ({
    light,
    dark,
  }: {
    light: string;
    dark: string;
  }): string => {
    const isLightMode = theme.palette.mode === "light";

    return isLightMode ? light : dark;
  };

  return { getContrastColor };
};
