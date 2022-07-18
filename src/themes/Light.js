import { createTheme } from "@mui/material";
import { grey, purple } from "@mui/material/colors";

export const Light = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: purple[700]
        },
        background: {
            default: grey[50]
        }
    }
});