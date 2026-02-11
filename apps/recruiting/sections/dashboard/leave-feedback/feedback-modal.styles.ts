export const styles = {
    textFieldStyling: ({ item, clickedItemId, theme }: any) => ({
      cursor: "pointer",
      borderRadius: "8px",
      color: "red",
      backgroundColor:
        item.id === clickedItemId ? "primary.main" : "background.default",
      mb: 2,
      "& .MuiInputBase-input": {
        color:
          item.id === clickedItemId
            ? theme.palette.neutral[100]
            : "text.secondary",
        fontSize: "14px",
      },
    }),
    buttonWrapper: {
      display: "flex",
      justifyContent: "end",
      gap: 2,
    },
  };
  