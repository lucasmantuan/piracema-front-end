import { CssBaseline } from "@mui/material";
import { Menu } from "components";
import { AppThemeProvider, MenuProvider, PopupProvider } from "contexts";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "routes";
import { Translates } from "utils";

export const App = () => {
    return (
        <AppThemeProvider>
            <CssBaseline />
            <PopupProvider>
                <MenuProvider>
                    <BrowserRouter>
                        <Menu>
                            <AppRoutes />
                        </Menu>
                    </BrowserRouter>
                </MenuProvider>
            </PopupProvider>
        </AppThemeProvider>
    );
};