import { useField } from "@unform/core";
import { useDebounce } from "hooks";
import { useState } from "react";

export const AutoCompleteNome = () => {
    const { debounce } = useDebounce();
    const { fieldName, registerField, defaultValue, error, clearError } = useField("nomeCientifico");
    const [busca, setBusca] = useState("");

};