import { DeleteOutlined as DeleteIcon, UploadFileOutlined as UploadIcon } from "@mui/icons-material";
import { Box, Button, IconButton, Paper, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, ptBR } from "@mui/x-data-grid";
import { BarraRelatorio } from "components";
import { usePopup } from "contexts";
import { useDebounce } from "hooks";
import { Base } from "layout";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PassagemService } from "services";

export const Passagem = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
    const mdDown = useMediaQuery(theme.breakpoints.down("md"));
    const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
    const { debounce } = useDebounce();
    const [searchParams, setSearchParams] = useSearchParams();
    const [createPopup, closePopup] = usePopup();
    const [loading, setLoading] = useState(true);
    const [rowsRecords, setRowsRecords] = useState([]);

    const columnsRecords = [
        {
            field: "id",
            headerName: "Id",
            headerAlign: "center",
            align: "center",
            type: "number",
            flex: 0.25,
            hide: lgDown ? true : false,
        },
        {
            field: "pitTag",
            headerName: "PitTag",
            headerAlign: "center",
            align: "center",
            type: "string",
            flex: 0.75
        },
        {
            field: "nomeCientifico",
            headerName: "Nome Cientifico",
            headerAlign: "center",
            align: "center",
            type: "string",
            flex: 1.25,
            hide: mdDown ? true : false
        },
        {
            field: "comprimentoTotal",
            headerName: "Comprimento Total",
            headerAlign: "center",
            align: "center",
            type: "number",
            flex: 0.85,
            hide: xlDown ? true : false
        },
        {
            field: "dataSoltura",
            headerName: "Data da Soltura",
            headerAlign: "center",
            align: "center",
            type: "string",
            flex: 0.85,
            hide: lgDown ? true : false
        },
        {
            field: "localSoltura",
            headerName: "Local da Soltura",
            headerAlign: "center",
            align: "center",
            type: "string",
            flex: 1.25
        },
        {
            field: "recaptura",
            headerName: "Recaptura",
            headerAlign: "center",
            align: "center",
            type: "boolean",
            flex: 0.75,
            hide: xlDown ? true : false
        },
        {
            field: "nomeAntena",
            headerName: "Nome da Antena",
            headerAlign: "center",
            align: "center",
            type: "string",
            flex: 1.25
        },
        {
            field: "dataPassagem",
            headerName: "Data da Passagem",
            headerAlign: "center",
            align: "center",
            type: "string",
            flex: 0.85,
            hide: lgDown ? true : false
        },
        {
            field: "excluir",
            headerName: "Excluir",
            headerAlign: "center",
            align: "center",
            flex: 0.7,
            renderCell: (cell) => (
                <IconButton
                    size="small"
                    onClick={() => {
                        handlePopupConfirmDelete(cell.id);
                    }}>
                    <DeleteIcon
                        fontSize="small" />
                </IconButton>
            )
        }
    ];

    const handlePopupConfirmDelete = (id) => {
        createPopup(
            {
                title: "Excluir?",
                content: "Você deseja excluir a passagem?",
                onClose: closePopup,
                actions: (
                    <Fragment>
                        <Button
                            onClick={() => {
                                closePopup();
                            }}
                            autoFocus>
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => {
                                handleDelete(id);
                                closePopup();
                            }}>
                            Excluir
                        </Button>
                    </Fragment>
                )
            });
    };

    const handlePopupOkDelete = () => {
        createPopup(
            {
                title: "Excluida",
                content: "Passagem excluida com sucesso!",
                actions: (
                    <Fragment>
                        <Button
                            onClick={() => {
                                closePopup();
                            }}
                            autoFocus>
                            Fechar
                        </Button>
                    </Fragment>
                )
            });
    };

    const busca = useMemo(() => {
        return (searchParams.get("busca") || "");
    }, [searchParams]);

    const pagina = useMemo(() => {
        return (Number(searchParams.get("pagina") || "0"));
    }, [searchParams]);

    useEffect(() => {
        setLoading(true);
        debounce(() => {
            PassagemService.getAll(pagina, busca)
                .then((result) => {
                    setLoading(false);
                    if (result instanceof Error) {
                        console.log(result.message);
                    } else {
                        setRowsRecords(result.data);
                    }
                });
        });
    }, [busca, pagina]);

    const handleDelete = (id) => {
        PassagemService.deleteById(id)
            .then((result) => {
                if (result instanceof Error) {
                    console.log(result.message);
                } else {
                    setRowsRecords((records) => {
                        return [
                            ...records.filter(record => record.id !== id)
                        ];
                    });
                    handlePopupOkDelete();
                }
            });
    };

    return (
        <Base
            titulo="Relatório das Passagens"
            barra={<BarraRelatorio
                showSearch
                textSearch={busca}
                onChangeSearch={(value) => setSearchParams({ busca: value, pagina: "0" }, { replace: true })}
                labelSearch="Nome Ciêntifico"
                textAux="CSV"
                iconAux={<UploadIcon />}/>}>

            <Box
                component={Paper}
                elevation={0}
                variant="outlined"
                marginY={2}
                marginRight={2}
                padding={2} >

                <DataGrid
                    autoHeight
                    columns={columnsRecords}
                    disableColumnMenu={true}
                    disableSelectionOnClick
                    loading={loading}
                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                    rows={rowsRecords}
                    sx={{ padding: 2 }} />

            </Box>

        </Base >
    );
};