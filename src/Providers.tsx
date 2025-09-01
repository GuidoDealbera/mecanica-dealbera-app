import { Provider } from "react-redux";
import { store } from "./Store/store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

interface ProvidersProps {
  children: React.ReactNode;
}
const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={5}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
