import { SaveOutlined as SaveIcon } from "@mui/icons-material";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";

export const BarraCadastro = ({
    onClickSave,
    showSave = true,
    showSaveLoading = false }) => {
    const theme = useTheme();

    return (
        <Box
            component={Paper}
            elevation={0}
            variant="outlined"
            height={theme.spacing(10)}
            padding={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={1}>

            {(showSave && !showSaveLoading) && (<Button
                variant="contained"
                disableElevation
                onClick={onClickSave}
                startIcon={<SaveIcon />}>
                <Typography
                    variant="button"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden">
                    Salvar
                </Typography>
            </Button>)}
        </Box>
    );
};