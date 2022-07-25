import { HomeOutlined as HomeIcon, PhishingOutlined as FishIcon } from "@mui/icons-material";
import { useMenuContext } from "contexts";
import { Dashboard, Peixe } from "pages";
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
                path: "/peixes"
            }
        ]);
    }, []);

    return (
        <Routes>
            <Route
                path="/dashboard"
                element={<Dashboard />} />
            <Route
                path="/peixes"
                element={<Peixe />} />
            <Route
                path="*"
                element={<Navigate
                    to="/dashboard" />} />
        </Routes>
    );
};