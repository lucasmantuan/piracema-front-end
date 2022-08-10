import { useCallback, useRef } from "react";

export const useUnformForm = () => {
    const form = useRef(null);
    const clickSaveNew = useRef(false);
    const clickSaveReturn = useRef(false);

    const save = useCallback(() => {
        clickSaveNew.current = false;
        clickSaveReturn.current = false;
        form.current?.submitForm();
    }, []);

    const saveNew = useCallback(() => {
        clickSaveNew.current = true;
        clickSaveReturn.current = false;
        form.current?.submitForm();
    }, []);

    const isSaveNew = useCallback(() => {
        return clickSaveNew.current;
    }, []);

    const saveReturn = useCallback(() => {
        clickSaveNew.current = false;
        clickSaveReturn.current = true;
        form.current?.submitForm();
    }, []);

    const isSaveReturn = useCallback(() => {
        return clickSaveReturn.current;
    }, []);

    return {
        form,
        save,
        saveNew,
        isSaveNew,
        saveReturn,
        isSaveReturn
    };
};