import { Provider } from "react-redux";
import { store } from "./Store/store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: React.ReactNode;
}
const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster duration={3500} richColors />
        {children}
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
