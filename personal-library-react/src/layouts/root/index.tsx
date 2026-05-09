import type { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { useUIStore } from "@stores/uiStore";

interface LayoutProps {
  children: ReactNode;
}

export function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CssBaseline />
      {children}
    </LocalizationProvider>
  );
}

export default Layout;
