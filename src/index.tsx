import App from "./App";
import ReactDOM from "react-dom/client";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const theme = createTheme({
    palette: {
        mode: "dark",
    }
})

root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
);