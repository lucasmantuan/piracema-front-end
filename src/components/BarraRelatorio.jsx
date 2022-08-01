import { AddOutlined as AddIcon, SearchOutlined as SearchIcon } from "@mui/icons-material";
import { Box, Button, InputAdornment, Paper, TextField, Typography, useTheme } from "@mui/material";
import { Constants } from "environment";

export const BarraRelatorio = ({
    showTextField = false,
    valueTextField = "",
    onChangeTextField,
    showButton = true,
    textButton,
    onClickButton }) => {
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

            {showTextField && <TextField
                variant="outlined"
                size="small"
                label={Constants.PROCURAR}
                value={valueTextField}
                onChange={(e) => onChangeTextField?.(e.target.value)}
                InputProps={{
                    endAdornment: <InputAdornment
                        position="end">
                        <SearchIcon />
                    </InputAdornment>
                }} />}


            <Box
                flex={1}
                display="flex"
                justifyContent="flex-end">

                {showButton && <Button
                    variant="contained"
                    disableElevation
                    onClick={onClickButton}
                    endIcon={<AddIcon />}>
                    <Typography
                        variant="button"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden">
                        {textButton}
                    </Typography>
                </Button>}

            </Box>

        </Box>
    );
};