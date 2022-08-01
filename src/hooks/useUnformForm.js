import { useCallback, useRef } from "react";

export const useUnformForm = () => {
    const form = useRef(null);

    const save = useCallback(() => {
        form.current?.submitForm();
    }, []);

    return {
        form,
        save
    };
};