import { ThemeModeColor } from "@root/utils";

export function companyProfileStyles(): any {
  return {

    companyWrapper: {
      padding: "18px",
      height: "100%",
      maxHeight: '100%',
      minHeight: "185px",
      "@media(max-width: 1440px)": {
        minHeight: '186.6px',
      },
    },
    title: {
      paddingTop: "20px",
      fontSize: "1.8rem",
      fontWeight: 700,
    },
    content: {
      paddingTop: "12px",
      fontSize: "1.2rem",
      fontWeight: 400,
      color: ThemeModeColor("#344054", "white"),
    }

  };
}

