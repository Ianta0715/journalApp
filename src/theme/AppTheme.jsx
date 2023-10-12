import { ThemeProvider } from '@mui/material/styles';
import { purpleTheme } from './purpleTheme';
import  CssBaseline  from '@mui/material/CssBaseline';

export const AppTheme = ({children}) => {
  return (
      <ThemeProvider theme= { purpleTheme }>
          <CssBaseline />
        {children}
      </ThemeProvider>
  )
}
