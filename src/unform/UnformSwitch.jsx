import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useRef, useState } from "react";

export const UnformSwitch = ({ name, ...rest }) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
    const [value, setValue] = useState(false);
    const element = useRef(null);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: element.current,
            //getValue: () => value,
            getValue: (ref) => ref.checked,
            //setValue: (ref, value) => setValue(value)
            setValue: (ref, value) => { ref.checked = value; }
        });
    }, [registerField, fieldName, value]);

    return (
        <FormGroup>
            <FormControlLabel
                {...rest}
                control={<Switch
                    inputRef={element}
                    checked={value}
                    onChange={(e) => {
                        setValue(e.target.checked);
                    }} />} />
        </FormGroup>
    );
};