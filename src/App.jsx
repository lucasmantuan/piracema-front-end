import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Menu } from "./components/Menu";
import { MenuProvider } from "./contexts/MenuContext";
import { AppThemeProvider } from "./contexts/ThemeContext";
import { AppRoutes } from "./routes/AppRoutes";

export const App = () => {
    return (
        <AppThemeProvider>
            <CssBaseline />
            <MenuProvider>
                <BrowserRouter>
                    <Menu>
                        <AppRoutes />
                    </Menu>
                </BrowserRouter>
            </MenuProvider>
        </AppThemeProvider>
    );
};