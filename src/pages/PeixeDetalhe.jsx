import { Box, Checkbox, Grid, InputAdornment, LinearProgress, Paper } from "@mui/material";
import { Ferramentas } from "components";
import { UnformForm, UnformTextField, UnformSwitch } from "forms";
import { Base } from "layout";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const PeixeDetalhe = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [pitTag, setPitTag] = useState("");
    const { id = "new" } = useParams();

    return (
        <Base
            titulo={id === "new" ? "Novo Peixe" : `PitTag ${pitTag}`}
            barra={<Ferramentas />}>

            <UnformForm>
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