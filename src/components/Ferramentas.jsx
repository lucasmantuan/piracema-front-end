import { AddOutlined as AddIcon, SearchOutlined as SearchIcon } from "@mui/icons-material";
import { Box, Button, InputAdornment, Paper, TextField, Typography, useTheme } from "@mui/material";

export const Ferramentas = ({
    valueTextField = "",
    onChangeTextField }) => {
    const theme = useTheme();

    return (
        <Box
            component={Paper}
            elevation={0}
            variant="outlined"
            height={theme.spacing(10)}
            marginX={2}
            padding={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={1}>
            <TextField
                variant="outlined"
                size="small"
                label="Procurar..."
                value={valueTextField}
                onChange={(e) => onChangeTextField?.(e.target.value)}
                InputProps={{
                    endAdornment: <InputAdornment
                        position="end">
                        <SearchIcon />
                    </InputAdornment>
                }} />
            <Button
                variant="contained"
                disableElevation
                endIcon={<AddIcon />}>
                <Typography
                    variant="button"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden">
                    Adicionar
                </Typography>
            </Button>
        </Box>
    );
};