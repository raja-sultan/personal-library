import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

// types
import type { CardProps } from "./card.types";
// styles
import { styles } from "./card.styles";

export function Card(props: CardProps): JSX.Element {
  const { className, title, children, href } = props;

  return (
    <Paper elevation={3} sx={styles.card}>
      <Typography component="h5" variant="h5">
        Title: {title}
      </Typography>
      <Typography component="p" gutterBottom variant="body1">
        <strong>Class Name:</strong> {className}
      </Typography>
      <Typography gutterBottom variant="body1">
        {href}
      </Typography>
      {children}
    </Paper>
  );
}
