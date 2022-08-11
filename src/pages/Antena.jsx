import { AddOutlined as AddIcon, CellTowerOutlined as TowerIcon, DeleteOutlined as DeleteIcon, EditOutlined as EditIcon } from "@mui/icons-material";
import { Box, Button, Grid, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { BarraRelatorio, MapaAntenas } from "components";
import { usePopup } from "contexts";
import { useDebounce } from "hooks";
import { Base } from "layout";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AntenaService } from "services";
import { Constants } from "utils";

export const Antena = () => {
    const navigate = useNavigate();
    const { debounce } = useDebounce();
    const [searchParams, setSearchParams] = useSearchParams();
    const [createPopup, closePopup] = usePopup();
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);

    const handlePopupConfirmDelete = (id) => {
        createPopup(
            {
                title: "Excluir?",
                content: "Você deseja excluir a antena?",
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
                content: "Antena excluida com sucesso!",
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
            AntenaService.getAll(pagina, busca)
                .then((result) => {
                    setLoading(false);
                    if (result instanceof Error) {
                        console.log(result.message);
                    } else {
                        setTotalRecords(result.total);
                        setRecords(result.data);
                    }
                });
        });
    }, [busca, pagina]);

    const handleDelete = (id) => {
        AntenaService.deleteById(id)
            .then((result) => {
                if (result instanceof Error) {
                    console.log(result.message);
                } else {
                    setRecords((records) => {
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
            titulo="Relatório das Antenas"
            barra={<BarraRelatorio
                showSearch
                textSearch={busca}
                onChangeSearch={(value) => setSearchParams({ busca: value, pagina: "0" }, { replace: true })}
                labelSearch="Antena"
                textAux="Nova"
                iconAux={<AddIcon />}
                onClickAux={() => { navigate("/antena/detalhe/new"); }} />}>

            <Box
                component={Paper}
                elevation={0}
                variant="outlined"
                marginY={2}
                marginRight={2}
                padding={2} >

                <Grid
                    container
                    direction="column"
                    spacing={2}>

                    {loading && (
                        <Grid
                            item
                            xs={12}>
                            <LinearProgress
                                variant="indeterminate" />
                        </Grid>)}

                    {!loading && totalRecords === 0 && (
                        <Grid
                            item
                            xs={12}>
                            {Constants.LISTAGEM}
                        </Grid>)}

                    <Grid
                        container
                        item
                        direction="row"
                        spacing={2} >

                        {records.map(
                            (record) => {
                                return (
                                    <Grid
                                        key={record.id}
                                        item
                                        xs={12}
                                        md={6}
                                        lg={4}>

                                        <Box
                                            component={Paper}
                                            elevation={0}
                                            variant="outlined"
                                            padding={2}>

                                            {record.status === true
                                                ? <TowerIcon
                                                    color="success"
                                                    sx={{ fontSize: 50 }} />
                                                : <TowerIcon
                                                    color="error"
                                                    sx={{ fontSize: 50 }} />}

                                            <Typography
                                                marginBottom={0.5}
                                                fontWeight="bold" >
                                                Identificador:
                                                <Typography
                                                    component="span"
                                                    marginLeft={0.5}>
                                                    {record.id}
                                                </Typography>
                                            </Typography>

                                            <Typography
                                                marginBottom={0.5}
                                                fontWeight="bold" >
                                                Nome:
                                                <Typography
                                                    component="span"
                                                    marginLeft={0.5}>
                                                    {record.nome}
                                                </Typography>
                                            </Typography>

                                            <Typography
                                                marginBottom={0.5}
                                                fontWeight="bold" >
                                                Data de Instalação:
                                                <Typography
                                                    component="span"
                                                    marginLeft={0.5}>
                                                    {record.dataInstalacao}
                                                </Typography>
                                            </Typography>

                                            <Typography
                                                marginBottom={0.5}
                                                fontWeight="bold" >
                                                Latitude:
                                                <Typography
                                                    component="span"
                                                    marginLeft={0.5}>
                                                    {record.latitude}
                                                </Typography>
                                            </Typography>

                                            <Typography
                                                marginBottom={0.5}
                                                fontWeight="bold" >
                                                Longitude:
                                                <Typography
                                                    component="span"
                                                    marginLeft={0.5}>
                                                    {record.longitude}
                                                </Typography>
                                            </Typography>

                                            <Typography
                                                marginBottom={0.5}
                                                fontWeight="bold" >
                                                Longitude:
                                                <Typography
                                                    component="span"
                                                    marginLeft={0.5}>
                                                    {record.status ? "Ativada" : "Desativada"}
                                                </Typography>
                                            </Typography>

                                            <Stack
                                                direction="row"
                                                justifyContent="flex-end"
                                                alignItems="center"
                                                spacing={2}
                                                marginTop={2}>

                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => {
                                                        handlePopupConfirmDelete(record.id);
                                                    }}
                                                    startIcon={<DeleteIcon />}>
                                                    <Typography
                                                        variant="button"
                                                        whiteSpace="nowrap"
                                                        textOverflow="ellipsis"
                                                        overflow="hidden">
                                                        Excluir
                                                    </Typography>
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => navigate(`/antena/detalhe/${record.id}`)}
                                                    startIcon={<EditIcon />}>
                                                    <Typography
                                                        variant="button"
                                                        whiteSpace="nowrap"
                                                        textOverflow="ellipsis"
                                                        overflow="hidden">
                                                        Editar
                                                    </Typography>
                                                </Button>
                                            </Stack>

                                        </Box>

                                    </Grid>
                                );
                            })}

                    </Grid>

                </Grid>

                <Box
                    component={Paper}
                    elevation={0}
                    variant="outlined"
                    marginTop={2}
                    padding={2} >

                    <MapaAntenas />

                </Box>

            </Box>

        </Base >
    );
};