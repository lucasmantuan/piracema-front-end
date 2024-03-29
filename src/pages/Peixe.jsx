import { AddOutlined as AddIcon, DeleteOutlined as DeleteIcon, EditOutlined as EditIcon, PhishingOutlined as FishIcon } from "@mui/icons-material";
import { Box, Button, LinearProgress, Pagination, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { BarraRelatorio } from "components";
import { usePopup } from "contexts";
import { useDebounce } from "hooks";
import { Base } from "layout";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PeixeService } from "services";
import { Constants } from "utils";

export const Peixe = () => {
    const theme = useTheme();
    const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
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
                content: "Você deseja excluir o peixe?",
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
                title: "Excluido",
                content: "Peixe excluido com sucesso!",
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

    const pagina = useMemo(() => {
        return (Number(searchParams.get("pagina") || "1"));
    }, [searchParams]);

    const busca = useMemo(() => {
        return (searchParams.get("busca") || "");
    }, [searchParams]);

    useEffect(() => {
        setLoading(true);
        debounce(() => {
            PeixeService.getAll(pagina, busca)
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
    }, [pagina, busca]);

    const handleDelete = (id) => {
        PeixeService.deleteById(id)
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
            titulo="Relatório dos Peixes"
            barra={<BarraRelatorio
                showSearch
                textSearch={busca}
                onChangeSearch={(value) => setSearchParams({ pagina: "1", busca: value }, { replace: true })}
                labelSearch="PitTag"
                textAux="Novo"
                iconAux={<AddIcon />}
                onClickAux={() => { navigate("/peixe/detalhe/new"); }} />}>

            <Box
                component={Paper}
                elevation={0}
                variant="outlined"
                marginY={2}
                marginRight={2}
                padding={2}>

                {loading && (
                    <LinearProgress
                        variant="indeterminate" />)}

                {!loading && totalRecords === 0 && (Constants.LISTAGEM)}

                {records.map(
                    (record) => {
                        return (
                            <Box
                                key={record.id}
                                component={Paper}
                                elevation={0}
                                variant="outlined"
                                padding={2}
                                marginBottom={record.id === Constants.PEIXES ? 0 : 2} >

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
                                    PitTag:
                                    <Typography
                                        component="span"
                                        marginLeft={0.5}>
                                        {record.pitTag}
                                    </Typography>
                                </Typography>

                                <Typography
                                    marginBottom={0.5}
                                    fontWeight="bold" >
                                    Nome Científico:
                                    <Typography
                                        component="span"
                                        marginLeft={0.5}>
                                        {record.nomeCientifico}
                                    </Typography>
                                </Typography>

                                <Typography
                                    marginBottom={0.5}
                                    fontWeight="bold" >
                                    Local de Captura:
                                    <Typography
                                        component="span"
                                        marginLeft={0.5}>
                                        {record.localCaptura}
                                    </Typography>
                                </Typography>

                                <Typography
                                    marginBottom={0.5}
                                    fontWeight="bold" >
                                    Data da Soltura:
                                    <Typography
                                        component="span"
                                        marginLeft={0.5}>
                                        {record.dataSoltura}
                                    </Typography>
                                </Typography>

                                <Typography
                                    marginBottom={0.5}
                                    fontWeight="bold" >
                                    Local da Soltura:
                                    <Typography
                                        component="span"
                                        marginLeft={0.5}>
                                        {record.localSoltura}
                                    </Typography>
                                </Typography>

                                <Typography
                                    marginBottom={0.5}
                                    fontWeight="bold" >
                                    Amostra DNA:
                                    <Typography
                                        component="span"
                                        marginLeft={0.5}>
                                        {record.amostraDna}
                                    </Typography>
                                </Typography>

                                <Typography
                                    marginBottom={0.5}
                                    fontWeight="bold" >
                                    Recapturado:
                                    <Typography
                                        component="span"
                                        marginLeft={0.5}>
                                        {record.recaptura ? "Sim" : "Não"}
                                    </Typography>
                                </Typography>

                                <Stack
                                    direction="row"
                                    justifyContent={lgDown ? "flex-end" : "flex-start"}
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
                                        onClick={() => navigate(`/peixe/detalhe/${record.id}`)}
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
                        );
                    })}

                {(totalRecords > 0 && totalRecords > Constants.PEIXES) &&
                    (<Pagination
                        count={Math.ceil(totalRecords / Constants.PEIXES)}
                        onChange={(e, page) => setSearchParams({ busca, pagina: page.toString() }, { replace: true })}
                        page={pagina}
                        sx={{ marginTop: 2 }} />)}

            </Box>

        </Base>
    );
};