import { Box, Button, Grid, InputAdornment, LinearProgress, Paper } from "@mui/material";
import { AutoCompleteNome, BarraCadastro } from "components";
import { usePopup } from "contexts";
import { useUnformForm } from "hooks";
import { Base } from "layout";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PeixeService } from "services";
import { UnformForm, UnformSwitch, UnformTextField } from "unform";
import { number as YupNumber, object as YupObject, string as YupString, boolean as YupBoolean } from "yup";

export const PeixeDetalhe = () => {
    const [loading, setLoading] = useState(false);
    const [pitTag, setPitTag] = useState("");
    const [createPopup, closePopup] = usePopup();
    const { form, save, saveReturn, isSaveReturn } = useUnformForm();
    const { id = "new" } = useParams();
    const navigate = useNavigate();

    const schema = YupObject().shape({
        pitTag: YupString().required(),
        nomeCientifico: YupString().required(),
        comprimentoPadrao: YupNumber().required(),
        comprimentoTotal: YupNumber().required(),
        localCaptura: YupString().required(),
        pesoSoltura: YupNumber().required(),
        dataSoltura: YupString().required(),
        localSoltura: YupString().required(),
        amostraDna: YupString().required(),
        recaptura: YupBoolean().required()
    });

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
        } else {
            form.current?.setData({
                pitTag: "",
                nomeCientifico: "",
                comprimentoPadrao: "",
                comprimentoTotal: "",
                localCaptura: "",
                pesoSoltura: "",
                dataSoltura: "",
                localSoltura: "",
                amostraDna: "",
                recaptura: false
            });
        }
    }, [id]);

    const handleSave = (input) => {
        schema.validate(input, { abortEarly: false })
            .then((valid) => {
                if (id === "new") {
                    PeixeService.create(valid)
                        .then((result) => {
                            setLoading(false);
                            if (result instanceof Error) {
                                // Dialog
                            } else {
                                if (isSaveReturn()) {
                                    navigate("/peixe");
                                } else {
                                    navigate(`/peixe/detalhe/${result}`);
                                }
                            }
                        });
                } else {
                    PeixeService.updateById(Number(id), { id: Number(id), ...valid })
                        .then((result) => {
                            setLoading(false);
                            if (result instanceof Error) {
                                // Dialog
                            } else {
                                if (isSaveReturn()) {
                                    navigate("/peixe");
                                }
                            }
                        });
                }
            })
            .catch((errors) => {
                const messages = {};
                errors.inner.forEach((value) => {
                    if (!value.path) {
                        return;
                    }
                    messages[value.path] = value.message;
                });
                form.current?.setErrors(messages);
            });
    };

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

    const handleDelete = (id) => {
        PeixeService.deleteById(id)
            .then((result) => {
                if (result instanceof Error) {
                    console.log(result.message);
                } else {
                    handlePopupOkDelete();
                    navigate("/peixe");
                }
            });
    };

    return (
        <Base
            titulo={id === "new" ? "Novo Peixe" : `Peixe ${pitTag}`}
            barra={<BarraCadastro
                onClickSave={save}
                showSaveReturn
                onClickSaveReturn={saveReturn}
                onClickNew={() => { navigate("/peixe/detalhe/new"); }}
                textNew="Novo"
                showNew={id !== "new"}
                onClickDelete={() => { handlePopupConfirmDelete(Number(id)); }}
                showDelete={id !== "new"}
                onClickReturn={() => { navigate("/peixe"); }} />}>

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
                                <AutoCompleteNome
                                    externalLoading={loading} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformTextField
                                    type="number"
                                    name="comprimentoPadrao"
                                    size="small"
                                    label="Comprimento Padrão"
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
                                    type="number"
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
                                    type="number"
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