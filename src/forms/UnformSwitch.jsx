import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

export const UnformSwitch = ({ name, ...rest }) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
    const [value, setValue] = useState(defaultValue || false);

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (ref, value) => setValue(value)
        });
    }, [registerField, fieldName, value]);

    return (
        <FormGroup>
            <FormControlLabel
                {...rest}
                control={<Switch
                    checked={value}
                    onChange={(e) => {
                        setValue(e.target.checked);
                    }} />} />
        </FormGroup>
    );
};