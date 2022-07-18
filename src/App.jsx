import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "./contexts/ThemeContext";
import { AppRoutes } from "./routes/AppRoutes";

export const App = () => {
    return (
        <AppThemeProvider>
            <CssBaseline />
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AppThemeProvider>
    );
};