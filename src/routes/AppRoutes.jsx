import { CellTowerOutlined as TowerIcon, HomeOutlined as HomeIcon, PhishingOutlined as FishIcon, WavesOutlined as WavesIcon } from "@mui/icons-material";
import { useMenuContext } from "contexts";
import { Antena, AntenaDetalhe, Dashboard, Peixe, PeixeDetalhe } from "pages";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
    const { handleOptionsMenu } = useMenuContext();

    useEffect(() => {
        handleOptionsMenu([
            {
                id: 1,
                icon: <HomeIcon />,
                label: "Dashboard",
                path: "/dashboard"
            },
            {
                id: 2,
                icon: <FishIcon />,
                label: "Peixes",
                path: "/peixe"
            },
            {
                id: 3,
                icon: <TowerIcon />,
                label: "Antenas",
                path: "/antena"
            },
            {
                id: 4,
                icon: <WavesIcon />,
                label: "Passagens",
                path: "/passagem"
            }
        ]);
    }, []);

    return (
        <Routes>
            <Route
                path="/dashboard"
                element={<Dashboard />} />
            <Route
                path="/peixe"
                element={<Peixe />} />
            <Route
                path="/peixe/detalhe/:id"
                element={<PeixeDetalhe />} />
            <Route
                path="/antena"
                element={<Antena />} />
            <Route
                path="/antena/detalhe/:id"
                element={<AntenaDetalhe />} />
            <Route
                path="*"
                element={<Navigate
                    to="/dashboard" />} />
        </Routes>
    );
};