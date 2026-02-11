import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Seo } from "../seo";
import type { Theme } from "@mui/material/styles/createTheme";
import type { ErrorProps } from "./error.types";
import { styles } from "./error.styles";

export function Error(props: ErrorProps): JSX.Element {
  const { statusCode, title } = props;
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const text = `${statusCode}: ${title}`;

  return (
    <>
      <Seo title={text} />
      <Box component="main" sx={styles.errorContainer}>
        <Container maxWidth="lg">
          <Box sx={styles.errorTextBox}>
            <Typography align="center" variant={mdUp ? "h1" : "h4"}>
              {text}
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}
