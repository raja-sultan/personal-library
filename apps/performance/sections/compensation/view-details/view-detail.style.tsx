import type{ Theme } from "@mui/material";
import { ThemeModeColor } from "@root/utils";

export const styles = {
  paper: {
    borderRadius: '24px 0px 0px 24px',
    p: { md: '24px', xs: '18px' },
    width: { md: '380px', xs: '320px' },
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    mb: '24px'
  },
  drawerDetails: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  sliderStyle: {
    mb: '24px',
    '& ._track, & ._rail': {
      height: '10px'
    },
    '& ._markLabel': {
      fontSize: '12px',
      color: 'neutral.500',
      transform: 'translateX(-75%)',
      '&[data-index="0"]' : {
        transform:'none'
      },
    }
  },
  drawerBottomImgWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    mb: '24px'
  },
  drawerImgWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flex: 1,
  },
  titleWithTextWrapper:{
    mb:'24px',
     flexBasis:'50%',
  },
  customCloseIcon: (theme: Theme) => ({
    position: "absolute",
    boxShadow: `0px 1px 2px 0px ${theme.palette.neutral[900]}`,
    "&:hover": {
      backgroundColor: "background.paper",
    },
    backgroundColor: "background.paper",
    top: "50%",
    transform: "translateY(-50%)",
    left: "-20px",
  }),
  closeIcon:{ ml: 'auto', cursor: 'pointer' },
  dividerStyle:{ mb: '24px' },
  color: "#667085",
 button:(getValue)=> ({ palette: { neutral } }: Theme) => ({
    background: getValue ? "primary.lightest" : "",
    borderColor: getValue
      ? "primary.lightest"
      : ThemeModeColor(neutral[300], neutral[400]),
    color: getValue
      ? "primary.lightest"
      : ThemeModeColor(neutral[600], neutral[400]),
      mb: "48px" ,
    "&:hover": {
      borderColor: ThemeModeColor(neutral[300], neutral[400]),
    },
  }),
}