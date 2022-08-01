import { ArrowBackOutlined as ArrowBackIcon, AddOutlined as AddIcon, DeleteOutlined as DeleteIcon, SaveOutlined as SaveIcon } from "@mui/icons-material";
import { Box, Button, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";

export const BarraCadastro = ({
    onClickSave,
    showSave = true,
    showSaveLoading = false,
    onClickSaveReturn,
    showSaveReturn = false,
    showSaveReturnLoading = false,
    onClickDelete,
    showDelete = false,
    showDeleteLoading = false,
    onClickNew,
    textNew,
    showNew = true,
    showNewLoading = false,
    onClickReturn,
    showReturn = true,
    showReturnLoading = false
}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));
    const mdDown = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box
            component={Paper}
            elevation={0}
            variant="outlined"
            height={theme.spacing(10)}
            padding={2}
            display="flex"
            alignItems="center"
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

            {(showSaveReturn && !showSaveReturnLoading && !smDown && !mdDown) && (<Button
                variant="contained"
                disableElevation
                onClick={onClickSaveReturn}
                startIcon={<SaveIcon />}>
                <Typography
                    variant="button"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden">
                    Salvar e Voltar
                </Typography>
            </Button>)}

            {(showDelete && !showDeleteLoading) && (<Button
                variant="contained"
                disableElevation
                onClick={onClickDelete}
                startIcon={<DeleteIcon />}>
                <Typography
                    variant="button"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden">
                    Apagar
                </Typography>
            </Button>)}

            <Box
                flex={1}
                display="flex"
                justifyContent="flex-end"
                gap={1}>

                {(showNew && !showNewLoading && !smDown) && (<Button
                    variant="contained"
                    disableElevation
                    onClick={onClickNew}
                    startIcon={<AddIcon />}>
                    <Typography
                        variant="button"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden">
                        {textNew}
                    </Typography>
                </Button>)}

                {(showReturn && !showReturnLoading) && (<Button
                    variant="contained"
                    disableElevation
                    onClick={onClickReturn}
                    startIcon={<ArrowBackIcon />}>
                    <Typography
                        variant="button"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden">
                        Voltar
                    </Typography>
                </Button>)}
            </Box>

        </Box>
    );
};