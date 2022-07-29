import { HomeOutlined as HomeIcon, PhishingOutlined as FishIcon } from "@mui/icons-material";
import { useMenuContext } from "contexts";
import { Dashboard, Peixe, PeixeDetalhe } from "pages";
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
                path="*"
                element={<Navigate
                    to="/dashboard" />} />
        </Routes>
    );
};