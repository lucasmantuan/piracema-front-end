import { TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

export const UnformTextField = ({ name, ...rest }) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
    const [value, setValue] = useState(defaultValue || "");

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (ref, value) => setValue(value)
        });
    }, [registerField, fieldName, value]);

    return (
        <TextField
            {...rest}
            value={value}
            error={!!error}
            helperText={error}
            defaultValue={defaultValue}
            onChange={(e) => {
                setValue(e.target.value);
                rest.onChange?.(e);
            }}
            onKeyDown={(e) => {
                error && clearError();
                rest.onKeyDown?.(e);
            }} />
    );
};