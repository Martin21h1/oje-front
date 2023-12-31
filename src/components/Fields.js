import React from "react";

import TextField from "@material-ui/core/TextField";

export const InputTextField = ({value, label, name, onChange, error, helperText, className}) => <TextField
    variant="outlined"
    required
    id={name}
    label={label}
    name={name}
    autoComplete={name}
    value={value}
    onChange={onChange}
    type={name}
    error={error}
    helperText={helperText}
    className={className}
/>;
