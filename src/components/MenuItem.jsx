import { Icon, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

export const MenuItem = ({ icon, path, label, onClick }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const resolvedPath = useResolvedPath(path);

    const match = useMatch({
        path: resolvedPath.pathname,
        end: false
    });

    const handleClick = () => {
        navigate(path);
        onClick?.();
    };

    return (
        <ListItemButton
            selected={!!match}
            onClick={handleClick}>
            <ListItemIcon
                sx={{ minWidth: theme.spacing(5) }} >
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText
                primary={label} />
        </ListItemButton>
    );
};