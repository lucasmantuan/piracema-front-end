import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

export const Base = ({ children, titulo }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            height="100%"
            display="flex"
            flexDirection="column"
            gap={1}>
            <Box
                padding={2}>
                <Typography
                    variant={smDown ? "h5" : "h4"}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis">
                    {titulo}
                </Typography>
            </Box>
            <Box>

            </Box>
            <Box
                flex={1}>
                {children}
            </Box>
        </Box>
    );
};