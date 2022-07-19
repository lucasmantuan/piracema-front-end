import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import { Fragment } from "react";
import { useThemeContext } from "../contexts/ThemeContext";

export const Menu = () => {
    const theme = useTheme();
    const { toggleTheme } = useThemeContext();

    return (
        <Fragment>
            <AppBar
                sx={{
                    zIndex: theme.zIndex.modal
                }}>
                <Toolbar
                    sx={{
                        height: theme.spacing(6)
                    }}>
                    <IconButton
                        color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}>
                        Projeto Piracema
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={toggleTheme} >
                        {theme.palette.mode === "light"
                            ? <DarkModeIcon />
                            : <LightModeIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                open={true}
                variant="permanent">
                <Box
                    height="100%"
                    width={theme.spacing(24)}
                    paddingTop={theme.spacing(8)}>
                    Menu
                </Box>
            </Drawer>
            <Box
                height="100vh"
                marginLeft={theme.spacing(24)}
                paddingTop={theme.spacing(8)}>
                Conteúdo
            </Box>
        </Fragment>
    );
};