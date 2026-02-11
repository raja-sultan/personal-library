export const styles = {
  currencyBtn1: (currencySymbol: string) => ({
    "&.MuiButtonGroup-firstButton": {
      borderColor: "#D0D5DD",
    },
    border: `1px solid #D0D5DD`,
    background: currencySymbol === "£" ? "primary.main" : "#fff",
    color: currencySymbol === "£" ? "#fff" : "neutral.700",
    "&:hover": { background: currencySymbol === "£" ? "primary.main" : "#fff" },
  }),

  currencyBtn2: (currencySymbol: string) => ({
    border: `1px solid #D0D5DD`,
    background: currencySymbol === "$" ? "primary.main" : "#fff",
    color: currencySymbol === "$" ? "#fff" : "neutral.700",
    "&:hover": { background: currencySymbol === "$" ? "primary.main" : "#fff" },
  }),

};
