import { DarkModeOutlined as DarkIcon, LightModeOutlined as LightIcon, LogoutOutlined as LogoutIcon, MenuOutlined as MenuIcon } from "@mui/icons-material";
import { AppBar, Box, Drawer, IconButton, List, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { MenuItem } from "components";
import { useMenuContext, useThemeContext } from "contexts";
import { Fragment } from "react";

export const Menu = ({ children }) => {
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down("md"));
    const { toggleTheme } = useThemeContext();
    const { openMenu, handleOpenMenu, optionsMenu, handleOptionsMenu } = useMenuContext();

    return (
        <Fragment>
            <AppBar
                elevation={0}
                sx={{ zIndex: theme.zIndex.modal }}>
                <Toolbar
                    sx={{ height: theme.spacing(8) }}>
                    {mdDown && <IconButton
                        color="inherit"
                        onClick={handleOpenMenu}>
                        <MenuIcon />
                    </IconButton>}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}>
                        Projeto Piracema
                    </Typography>
                    <IconButton
                        color="inherit" >
                        <LogoutIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        onClick={toggleTheme} >
                        {theme.palette.mode === "light"
                            ? <DarkIcon />
                            : <LightIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                variant={mdDown
                    ? "temporary"
                    : "permanent"}
                open={openMenu}
                onClose={handleOpenMenu}>
                <Box
                    height="100%"
                    width={theme.spacing(26)}
                    paddingTop={theme.spacing(10)}>
                    <List
                        component="nav">
                        {optionsMenu.map((option) => (<MenuItem
                            key={option.id}
                            icon={option.icon}
                            path={option.path}
                            label={option.label}
                            onClick={mdDown
                                ? handleOpenMenu
                                : null} />))}
                    </List>
                </Box>
            </Drawer>
            
            <Box
                height="100vh"
                marginLeft={!mdDown
                    ? theme.spacing(26)
                    : 0}
                paddingTop={theme.spacing(8)}>
                {children}
            </Box>
        </Fragment>
    );
};