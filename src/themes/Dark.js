import { createTheme } from "@mui/material";
import { grey, purple } from "@mui/material/colors";

export const Dark = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: purple[700]
        },
        background: {
            default: grey[900]
        }
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: grey[900]
                }
            }
        }
    }
});