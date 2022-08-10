import { DeleteOutlined as DeleteIcon } from "@mui/icons-material";
import { Box, Button, IconButton, Paper } from "@mui/material";
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
    const { debounce } = useDebounce();
    const [searchParams, setSearchParams] = useSearchParams();
    const [createPopup, closePopup] = usePopup();
    const [loading, setLoading] = useState(true);
    const [rowsRecords, setRowsRecords] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);

    const columnsRecords = [
        {
            field: "id",
            headerName: "Id",
            headerAlign: "center",
            align: "center",
            type: "number",
            flex: 0.25
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
            flex: 1.25
        },
        {
            field: "comprimentoTotal",
            headerName: "Comprimento",
            headerAlign: "center",
            align: "center",
            type: "number",
            flex: 0.75
        },
        {
            field: "dataSoltura",
            headerName: "Soltura",
            headerAlign: "center",
            align: "center",
            type: "string",
            flex: 0.75
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
            flex: 0.75
        },
        {
            field: "nomeAntena",
            headerName: "Antena",
            headerAlign: "center",
            align: "center",
            type: "string",
            flex: 1.25
        },
        {
            field: "dataPassagem",
            headerName: "Passagem",
            headerAlign: "center",
            align: "center",
            type: "string",
            flex: 0.75
        },
        {
            field: "excluir",
            headerName: "Excluir",
            align: "center",
            flex: 0.5,
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
                        setTotalRecords(result.total);
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
                textNew="Nova"
                onClickNew={() => { navigate("/passagem/detalhe/new"); }} />}>

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
                    loading={false}
                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                    rows={rowsRecords}
                    sx={{ padding: 2 }}
                />

            </Box>

        </Base >
    );
};