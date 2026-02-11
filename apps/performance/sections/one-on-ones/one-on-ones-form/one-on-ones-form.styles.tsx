export const styles = {
  formWrapper: { px: { xxs: 1.6, md: 2.4 } },
  divider: { my: 2.4 },
  browseTemplateBtn: {
    "&:hover": {
      backgroundColor: "primary.main",
      color: "common.white",
    },
  },
  repeatEvery: {
    maxWidth: 148,
    '& input': { textAlign: 'center' },
    '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none'
    },
  },
  repeatEveryIcon: ({ palette }) => ({
    background: palette.primary.main,
    mr: '-13px',
    width: 40,
    color: palette.common.white,
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '1px',
    '& svg': { cursor: 'pointer' }
  }),
  frequencyWrapper: ({ palette }) => ({
    '& .MuiFormGroup-root': {
      flexDirection: 'row',
      gap: '13px',
      mt: '16px',
      '& ._custom_checkbox': {
        height: 32,
        width: 32,
        borderRadius: '50%',
        background: palette.neutral[100],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        mx: 0,
        '&:first-child, &:last-child': {
          background: palette.neutral[300],
          pointerEvents: 'none'
        },
        '& .MuiButtonBase-root': {
          '& svg': {
            display: 'none'
          },
        },
        '& .MuiButtonBase-root.Mui-checked + .MuiTypography-root': {
          color: palette.primary.main,
          background: palette.primary.lightest
        },
        '& .MuiTypography-root': {
          position: 'absolute',
          color: palette.neutral[400],
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          fontSize: '16px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
      },
      '&._custom_single_checkbox': {
        '& .MuiFormControlLabel-root': {
          position: 'relative',
          height: 32,
          width: 32,
          borderRadius: '50%',
          background: palette.neutral[100],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          mx: 0,
          '&:first-child, &:last-child': {
            background: palette.neutral[300],
            pointerEvents: 'none'
          },
          '& .MuiButtonBase-root': {
            '& svg': {
              display: 'none'
            }
          },
          '& .MuiTypography-root': {
            position: 'absolute',
            color: palette.neutral[400],
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            fontSize: '16px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        },
        '& .MuiButtonBase-root.Mui-checked + .MuiTypography-root': {
          color: palette.primary.main,
          background: palette.primary.lightest
        },
      },
    }
  }),
  monthly: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    mt: '15px',
    // flexWrap: 'wrap',
  },
  monthlyInput: {
    flex: 0.6,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: '15px'
  },
  radioGroup: {
    width: 165,
    '& label:first-child': {
      // mt: '10px'
    },
    '& label:last-child': {
      mt: '10px'
    },
  }
};
