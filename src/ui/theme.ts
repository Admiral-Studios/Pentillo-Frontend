import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FF902A',
      light: '#FFFAF3',
    },
    secondary: {
      main: '#FFBC7F',
    },
  },
  typography: {
    h6: {
      color: '#AAA',
      fontSize: '16px',
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            color: '#FF7D06',
            // '&:hover': {
            //   border: '2px solid #FF7D06',
            // },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            color: '#fff',

            '&:hover': {
              backgroundColor: '#FF7D06',
            },
          },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '__gilroySans_5e5e33, __gilroySans_Fallback_5e5e33',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: '#0F0F0F',
          fontSize: '12px',
          fontWeight: 600,
          textAlign: 'center',
          fontFamily: 'inherit',
          backgroundColor: '#F8FBFF',
          lineHeight: '14.7px',
          borderRadius: '8px',
          padding: '4px 12px',
          boxShadow:
            '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
        },
        arrow: {
          color: '#F8FBFF',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: '-2px 3px 0px',
        },
      },
    },
  },
})
