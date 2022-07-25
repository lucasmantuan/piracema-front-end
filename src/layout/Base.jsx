import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

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
                margin={2}>
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
            </Box>
        </Box>
    );
};