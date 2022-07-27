import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { createContext, useContext, useState } from "react";

const PopupContext = createContext([]);

export const usePopup = () => {
    return (
        useContext(PopupContext)
    );
};

export const PopupProvider = ({ children }) => {
    const [popups, setPopups] = useState([]);

    const createPopup = (option) => {
        const popup = { ...option, open: true };
        setPopups((popups) => [...popups, popup]);
    };

    const closePopup = () => {
        setPopups((popups) => {
            const latestPopup = popups.pop();

            if (!latestPopup) {
                return popups;
            }

            if (latestPopup.onClose) {
                latestPopup.onClose();
            }

            return [...popups].concat({ ...latestPopup, open: false });
        });
    };

    const PopupContainer = ({
        title,
        content,
        actions,
        open,
        onClose }) => {
        console.log(onClose);
        return (
            <Dialog open={open} onClose={onClose} >
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {actions}
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <PopupContext.Provider
            value={[createPopup, closePopup]}>
            {popups.map((popup, index) => {
                return (
                    <PopupContainer
                        key={index}
                        {...popup} />
                );
            })}
            {children}
        </PopupContext.Provider>
    );
};