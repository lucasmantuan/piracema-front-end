import { useCallback, useRef } from "react";

export const useDebounce = (
    delayTime = 300,
    firstTime = true) => {

    const firstDelay = useRef(firstTime);
    const debouncing = useRef();

    const debounce = useCallback((debounceFunction) => {
        if (firstDelay.current) {
            firstDelay.current = false;
            debounceFunction();
        } else {
            if (debouncing.current) {
                clearTimeout(debouncing.current);
            }
            debouncing.current = setTimeout(() => {
                debounceFunction();
            }, delayTime);
        }
    }, [delayTime]);

    return { debounce };
};