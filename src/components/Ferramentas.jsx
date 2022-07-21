import { AddOutlined as AddIcon, SearchOutlined as SearchIcon } from "@mui/icons-material";
import { Box, Button, InputAdornment, Paper, TextField, useTheme } from "@mui/material";

export const Ferramentas = () => {
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
                Novo
            </Button>
        </Box>
    );
};