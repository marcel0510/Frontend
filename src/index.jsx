import React from "react";
import ReactDOM from "react-dom/client";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import  CssBaseline  from "@mui/material/CssBaseline";
import App from "./App";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { esES } from "@mui/x-date-pickers/locales";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#001f3e'
    },
    secondary: {
      main: '#ec1c18'
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 3000,
      staleTime: false,
      retry: false,
    },
    mutations: {
      refetchInterval: 3000,
    }
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} locate={esES.components.MuiLocalizationProvider.defaultProps.localeText}>
        <CssBaseline />
        <App />
        </LocalizationProvider>
        <ReactQueryDevtools />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
