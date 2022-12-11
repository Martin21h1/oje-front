import TextField from "@material-ui/core/TextField";
import React from "react";

export const InputTextField = ({value, label, name, onChange}) =>
    <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id={name}
        label={label}
        name={name}
        autoComplete={name}
        value={value}
        onChange={onChange}
    />;
