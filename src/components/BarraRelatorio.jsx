import { AddOutlined as AddIcon, SearchOutlined as SearchIcon } from "@mui/icons-material";
import { Box, Button, InputAdornment, Paper, TextField, Typography, useTheme } from "@mui/material";
import { Constants } from "utils";

export const BarraRelatorio = ({
    showSearch = false,
    textSearch = "",
    onChangeSearch,
    showNew = true,
    textNew,
    onClickNew }) => {
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
                label={Constants.PROCURAR}
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

                {showNew && <Button
                    variant="contained"
                    disableElevation
                    onClick={onClickNew}
                    endIcon={<AddIcon />}>
                    <Typography
                        variant="button"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden">
                        {textNew}
                    </Typography>
                </Button>}

            </Box>

        </Box>
    );
};