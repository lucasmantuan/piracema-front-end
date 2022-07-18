import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";

export const App = () => {
    return (
        <BrowserRouter>
            <CssBaseline />
            <AppRoutes />
        </BrowserRouter>
    );
};