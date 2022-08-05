import { Box, Button, Grid, LinearProgress, Paper } from "@mui/material";
import { BarraCadastro } from "components";
import { usePopup } from "contexts";
import { useUnformForm } from "hooks";
import { Base } from "layout";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AntenaService } from "services";
import { UnformForm, UnformSwitch, UnformTextField } from "unform";
import { boolean as YupBoolean, number as YupNumber, object as YupObject, string as YupString } from "yup";

export const AntenaDetalhe = () => {
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState("");
    const [createPopup, closePopup] = usePopup();
    const { form, save, saveReturn, isSaveReturn } = useUnformForm();
    const { id = "new" } = useParams();
    const navigate = useNavigate();

    const schema = YupObject().shape({
        nome: YupString().required(),
        dataInstalacao: YupString().required(),
        latitude: YupNumber().required(),
        longitude: YupNumber().required(),
        status: YupBoolean().required()
    });

    useEffect(() => {
        if (id !== "new") {
            setLoading(true);
            AntenaService.getById(Number(id))
                .then((result) => {
                    setLoading(false);
                    if (result instanceof Error) {
                        // Dialog
                        navigate("/peixes");
                    } else {
                        setNome(result.nome);
                        form.current?.setData(result);
                    }
                });
        } else {
            form.current?.setData({
                nome: "",
                dataInstalacao: "",
                latitude: "",
                longitude: "",
                status: false
            });
        }
    }, [id]);

    const handleSave = (input) => {
        schema.validate(input, { abortEarly: false })
            .then((valid) => {
                console.log(valid);
                if (id === "new") {
                    AntenaService.create(valid)
                        .then((result) => {
                            setLoading(false);
                            if (result instanceof Error) {
                                // Dialog
                            } else {
                                if (isSaveReturn()) {
                                    navigate("/antena");
                                } else {
                                    navigate(`/antena/detalhe/${result}`);
                                }
                            }
                        });
                } else {
                    AntenaService.updateById(Number(id), { id: Number(id), ...valid })
                        .then((result) => {
                            setLoading(false);
                            if (result instanceof Error) {
                                // Dialog
                            } else {
                                if (isSaveReturn()) {
                                    navigate("/antena");
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

    const handleDelete = (id) => {
        AntenaService.deleteById(id)
            .then((result) => {
                if (result instanceof Error) {
                    console.log(result.message);
                } else {
                    handlePopupOkDelete();
                    navigate("/antena");
                }
            });
    };

    return (
        <Base
            titulo={id === "new" ? "Nova Antena" : `Antena ${nome}`}
            barra={<BarraCadastro
                onClickSave={save}
                showSaveReturn
                onClickSaveReturn={saveReturn}
                onClickNew={() => { navigate("/antena/detalhe/new"); }}
                textNew="Nova"
                showNew={id !== "new"}
                onClickDelete={() => { handlePopupConfirmDelete(Number(id)); }}
                showDelete={id !== "new"}
                onClickReturn={() => { navigate("/antena"); }} />}>

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
                            <Grid
                                item
                                xs={12}>
                                <LinearProgress
                                    variant="indeterminate" />
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
                                    name="nome"
                                    size="small"
                                    label="Nome"
                                    disabled={loading}
                                    fullWidth
                                    onChange={(e) => setNome(e.target.value)} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformTextField
                                    type="text"
                                    name="dataInstalacao"
                                    size="small"
                                    label="Data de Instalação"
                                    disabled={loading}
                                    fullWidth />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformTextField
                                    type="text"
                                    name="latitude"
                                    size="small"
                                    label="Latitude"
                                    disabled={loading}
                                    fullWidth />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformTextField
                                    type="text"
                                    name="longitude"
                                    size="small"
                                    label="Longitude"
                                    disabled={loading}
                                    fullWidth />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <UnformSwitch
                                    name="status"
                                    label="Status da Antena"
                                    disabled={loading} />
                            </Grid>

                        </Grid>
                    </Grid>
                </Box>
            </UnformForm>

        </Base>
    );
};