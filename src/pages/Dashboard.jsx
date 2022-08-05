import { Box, Card, CardContent, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { Base } from "layout";
import { useEffect, useState } from "react";
import { AntenaService, PeixeService } from "services";

export const Dashboard = () => {
    const [loadingPeixe, setLoadingPeixe] = useState(true);
    const [totalPeixes, setTotalPeixes] = useState(0);
    const [loadingAntena, setLoadingAntena] = useState(true);
    const [totalAntenas, setTotalAntenas] = useState(0);

    useEffect(() => {
        setLoadingPeixe(true);
        PeixeService.getAll(1)
            .then((result) => {
                setLoadingPeixe(false);
                if (result instanceof Error) {
                    console.log(result.message);
                } else {
                    setTotalPeixes(result.total);
                }
            });
        setLoadingAntena(true);
        AntenaService.getAll(1)
            .then((result) => {
                setLoadingAntena(false);
                if (result instanceof Error) {
                    console.log(result.message);
                } else {
                    setTotalAntenas(result.total);
                }
            });
    }, []);

    return (
        <Base
            titulo="Dashboard">

            <Box
                component={Paper}
                elevation={0}
                variant="outlined"
                marginY={2}
                marginRight={2}
                padding={2} >

                <Grid
                    container>
                    <Grid
                        item
                        container
                        spacing={2}>
                        <Grid
                            item
                            xs={12}
                            md={6}>
                            <Card
                                elevation={0}
                                variant="outlined">
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        align="center">
                                        Peixes Cadastrados
                                    </Typography>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        padding={2}>
                                        {(loadingPeixe && (
                                            <CircularProgress />
                                        ))}
                                        {(!loadingPeixe && (
                                            <Typography
                                                variant="h1">
                                                {totalPeixes}
                                            </Typography>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}>
                            <Card
                                elevation={0}
                                variant="outlined">
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        align="center">
                                        Antenas Cadastradas
                                    </Typography>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        padding={2}>
                                        {(loadingAntena && (
                                            <CircularProgress />
                                        ))}
                                        {(!loadingAntena && (
                                            <Typography
                                                variant="h1">
                                                {totalAntenas}
                                            </Typography>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

            </Box>


        </Base >
    );
};