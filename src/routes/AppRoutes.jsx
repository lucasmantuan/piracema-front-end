import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useMenuContext } from "../contexts/MenuContext";
import { Dashboard } from "../pages/Dashboard";

export const AppRoutes = () => {
    const { handleOptionsMenu } = useMenuContext();

    useEffect(() => {
        handleOptionsMenu([
            {
                id: 1,
                icon: "home",
                label: "Página Inicial",
                path: "/"
            }
        ]);
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={<Dashboard />} />
            <Route
                path="*"
                element={<Navigate
                    to="/" />} />
        </Routes>
    );
};