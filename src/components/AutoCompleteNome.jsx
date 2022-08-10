import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useDebounce } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { PeixeService } from "services";

export const AutoCompleteNome = ({ externalLoading = false }) => {
    const { debounce } = useDebounce();
    const { fieldName, registerField, defaultValue, error, clearError } = useField("nomeCientifico");
    const [options, setOptions] = useState([]);
    const [localLoading, setLocalLoading] = useState(false);
    const [busca, setBusca] = useState("");
    const [nomeCientifico, setNomeCientifico] = useState();

    useEffect(() => {
        setLocalLoading(true);
        debounce(() => {
            PeixeService.getAll(1, nomeCientifico || busca)
                .then((result) => {
                    setLocalLoading(false);
                    if (result instanceof Error) {
                        console.log(result.message);
                    } else {
                        setOptions(result.data
                            .map(item => item.nomeCientifico)
                            .filter((value, index, array) => array.indexOf(value) === index)
                            .sort()
                        );
                    }
                });
        });
    }, [nomeCientifico, busca]);

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => nomeCientifico,
            setValue: (ref, value) => setNomeCientifico(value)
        });
    }, [registerField, fieldName, nomeCientifico]);

    const selectedValue = useMemo(() => {
        if (!nomeCientifico) {
            return null;
        }
        const selectedOption = options.find(value => value === nomeCientifico);
        if (!selectedOption) {
            return null;
        }
        return selectedOption;
    }, [nomeCientifico, options]);

    return (
        <Autocomplete
            clearText="Limpar"
            closeText="Fechar"
            disabled={externalLoading}
            disablePortal
            fullWidth
            loading={localLoading}
            loadingText="Carregando..."
            noOptionsText="Sem Opções"
            onChange={(e, value) => {
                setNomeCientifico(value);
                setBusca("");
                clearError();
            }}
            onInputChange={(e, value) => { setBusca(value); }}
            openText="Abrir"
            options={options}
            popupIcon={externalLoading || localLoading ? <CircularProgress size={22} /> : null}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={!!error}
                    helperText={error}
                    label="Nome Ciêntifico" />)}
            size="small"
            value={selectedValue} />
    );
};