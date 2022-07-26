import { DeleteOutlined as DeleteIcon, EditOutlined as EditIcon, PhishingOutlined as FishIcon } from "@mui/icons-material";
import { Box, Button, Divider, LinearProgress, Pagination, Paper, Stack, Typography } from "@mui/material";
import { Ferramentas } from "components";
import { Variables } from "environment";
import { useDebounce } from "hooks";
import { Base } from "layout";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PeixeService } from "services";

export const Peixe = () => {
    const { debounce } = useDebounce();
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);

    const busca = useMemo(() => {
        return (searchParams.get("busca") || "");
    }, [searchParams]);

    const pagina = useMemo(() => {
        return (Number(searchParams.get("pagina") || "1"));
    }, [searchParams]);

    useEffect(() => {
        setLoading(true);
        debounce(() => {
            PeixeService.getAll(pagina, busca)
                .then((result) => {
                    setLoading(false);
                    if (result instanceof Error) {
                        // Colocar um alert aqui!!! ***********************
                    } else {
                        setTotalRecords(result.total);
                        setRecords(result.data);
                    }
                });
        });
    }, [busca, pagina]);

    return (
        <Base
            titulo="Relatório dos Peixes"
            barra={<Ferramentas
                valueTextField={busca}
                onChangeTextField={(value) => setSearchParams({ busca: value, pagina: "1" }, { replace: true })} />}>

            <Box
                component={Paper}
                elevation={0}
                variant="outlined"
                marginY={2}
                marginRight={2}
                padding={2}>

                {loading && (<LinearProgress variant="indeterminate" />)}

                {!loading && totalRecords === 0 && (Variables.LISTAGEM)}

                {records.map(
                    (record) => {
                        return (
                            <Box
                                key={record.id}
                                component={Paper}
                                elevation={0}
                                variant="outlined"
                                padding={2}
                                marginBottom={2} >

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
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    spacing={2}>

                                    <Button
                                        variant="outlined"
                                        size="small"
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
                                        startIcon={<EditIcon />}>
                                        <Typography
                                            variant="button"
                                            whiteSpace="nowrap"
                                            textOverflow="ellipsis"
                                            overflow="hidden">
                                            Editar
                                        </Typography>
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<FishIcon />}>
                                        <Typography
                                            variant="button"
                                            whiteSpace="nowrap"
                                            textOverflow="ellipsis"
                                            overflow="hidden">
                                            Recaptura
                                        </Typography>
                                    </Button>
                                </Stack>
                            </Box>
                        );
                    })}

                {(totalRecords > 0 && totalRecords > Variables.LINHAS) &&
                    (<Pagination
                        page={pagina}
                        count={Math.ceil(totalRecords / Variables.LINHAS)}
                        onChange={(e, page) => setSearchParams({ busca, pagina: page.toString() }, { replace: true })} />)}

            </Box>
        </Base>
    );
};