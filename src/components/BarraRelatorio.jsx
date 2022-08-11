import { SearchOutlined as SearchIcon } from "@mui/icons-material";
import { Box, Button, InputAdornment, Paper, TextField, Typography, useTheme } from "@mui/material";

export const BarraRelatorio = ({
    showSearch = false,
    textSearch = "",
    onChangeSearch,
    labelSearch = "Procurar...",
    textAux,
    iconAux,
    onClickAux,
    showAux = true}) => {
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

            {showSearch && <TextField
                variant="outlined"
                size="small"
                label={labelSearch}
                value={textSearch}
                onChange={(e) => onChangeSearch?.(e.target.value)}
                InputProps={{
                    endAdornment: <InputAdornment
                        position="end">
                        <SearchIcon />
                    </InputAdornment>
                }} />}

            <Box
                flex={1}
                display="flex"
                justifyContent="flex-end"
                gap={1}>

                {showAux && <Button
                    variant="contained"
                    disableElevation
                    onClick={onClickAux}
                    endIcon={iconAux}>
                    <Typography
                        variant="button"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden">
                        {textAux}
                    </Typography>

                </Button>}

            </Box>
        </Box>
    );
};