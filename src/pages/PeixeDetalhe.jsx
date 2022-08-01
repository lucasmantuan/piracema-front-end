import { Box, Grid, InputAdornment, LinearProgress, Paper } from "@mui/material";
import { BarraCadastro } from "components";
import { useUnformForm } from "hooks";
import { Base } from "layout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PeixeService } from "services";
import { UnformForm, UnformSwitch, UnformTextField } from "unform";

export const PeixeDetalhe = () => {
    const [loading, setLoading] = useState(false);
    const [pitTag, setPitTag] = useState("");
    const { form, save } = useUnformForm();
    const { id = "new" } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== "new") {
            setLoading(true);
            PeixeService.getById(Number(id))
                .then((result) => {
                    setLoading(false);
                    if (result instanceof Error) {
                        // Dialog
                        navigate("/peixes");
                    } else {
                        setPitTag(result.pitTag);
                        form.current?.setData(result);
                    }
                });
        }
    }, [id]);

    const handleSave = (inputs) => {
        if (id === "new") {
            PeixeService.create(inputs)
                .then((result) => {
                    setLoading(false);
                    if (result instanceof Error) {
                        // Dialog
                    } else {
                        navigate(`/peixe/detalhe/${result}`);
                    }
                });
        } else {
            PeixeService.updateById(Number(id), { id: Number(id), ...inputs })
                .then((result) => {
                    setLoading(false);
                    if (result instanceof Error) {
                        // Dialog
                    } else {
                        navigate("/peixe");
                    }
                });
        }
    };

    return (
        <Base
            titulo={id === "new" ? "Novo Peixe" : `Peixe ${pitTag}`}
            barra={<BarraCadastro
                onClickSave={save} />}>

            <UnformForm ref={form} onSubmit={handleSave}>
                <Box
                    component={Paper}
                    elevation={0}
                    variant="outlined"
                    marginY={2}
                    marginRight={2}
                    padding={2}>
                    <Grid
                        container
                        direction="column"
                        padding={2}
                        spacing={2}>
                        {(loading && (
                            <Grid item>
                                <LinearProgress />
                            </Grid>))}
                        <Grid
                            container
                            item
                            direction="row"
                            spacing={2} >

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformTextField
                                    type="text"
                                    name="pitTag"
                                    size="small"
                                    label="Pit Tag"
                                    disabled={loading}
                                    fullWidth
                                    onChange={(e) => setPitTag(e.target.value)}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment
                                                position="end">
                                                HEX
                                            </InputAdornment>
                                    }} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformTextField
                                    type="text"
                                    name="nomeCientifico"
                                    size="small"
                                    label="Nome Ciêntifico"
                                    disabled={loading}
                                    fullWidth />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformTextField
                                    type="text"
                                    name="comprimentoPadrao"
                                    size="small"
                                    label="Comprimento Padrão"
                                    disabled={loading}
                                    fullWidth
                                    onChange={(e) => setPitTag(e.target.value)}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment
                                                position="end">
                                                CM
                                            </InputAdornment>
                                    }} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformTextField
                                    type="text"
                                    name="comprimentoTotal"
                                    size="small"
                                    label="Comprimento Total"
                                    disabled={loading}
                                    fullWidth
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment
                                                position="end">
                                                CM
                                            </InputAdornment>
                                    }} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformTextField
                                    type="text"
                                    name="localCaptura"
                                    size="small"
                                    label="Local Captura"
                                    disabled={loading}
                                    fullWidth />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformTextField
                                    type="text"
                                    name="pesoSoltura"
                                    size="small"
                                    label="Peso na Soltura"
                                    disabled={loading}
                                    fullWidth
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment
                                                position="end">
                                                KG
                                            </InputAdornment>
                                    }} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformTextField
                                    type="text"
                                    name="dataSoltura"
                                    size="small"
                                    label="Data da Soltura"
                                    disabled={loading}
                                    fullWidth />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformTextField
                                    type="text"
                                    name="localSoltura"
                                    size="small"
                                    label="Local da Soltura"
                                    disabled={loading}
                                    fullWidth />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformTextField
                                    type="text"
                                    name="amostraDna"
                                    size="small"
                                    label="Amostra DNA"
                                    disabled={loading}
                                    fullWidth />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformSwitch
                                    name="recaptura"
                                    label="Recapturado"
                                    disabled={loading} />
                            </Grid>

                        </Grid>
                    </Grid>
                </Box>
            </UnformForm>

        </Base>
    );
};