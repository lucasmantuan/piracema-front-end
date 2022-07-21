import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useMenuContext } from "../contexts/MenuContext";
import { Dashboard } from "../pages/Dashboard";
import { Peixes } from "../pages/Peixes";

export const AppRoutes = () => {
    const { handleOptionsMenu } = useMenuContext();

    useEffect(() => {
        handleOptionsMenu([
            {
                id: 1,
                icon: "home",
                label: "Dashboard",
                path: "/dashboard"
            },
            {
                id: 2,
                icon: "home",
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
                element={<Peixes />} />
            <Route
                path="*"
                element={<Navigate
                    to="/dashboard" />} />
        </Routes>
    );
};