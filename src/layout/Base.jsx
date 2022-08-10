import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { Copyright } from "components";

export const Base = ({ children, barra, titulo }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            height="100%"
            display="flex"
            flexDirection="column"
            gap={1}>
            <Box
                marginX={2}
                marginTop={4}
                marginBottom={2}>
                <Typography
                    variant={smDown ? "h5" : "h4"}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis">
                    {titulo}
                </Typography>
            </Box>
            
            {(barra &&
                <Box
                    marginX={2}>
                    {barra}
                </Box>)}

            <Box
                marginX={2}
                flex={1}
                overflow="auto">
                {children}
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    marginBottom={2}>
                    <Copyright />
                </Stack>
            </Box>
        </Box>
    );
};