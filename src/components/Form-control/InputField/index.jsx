import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { FormHelperText } from '@material-ui/core';



InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

InputField.defaultProps = {
    label: "",
    disabled: false,
}

function InputField(props) {

    const { form, name, label, disabled } = props;
    const { formState: { errors } } = form
    const hasError = errors[name]

    return (
        <div style={{ margin: "10px 0" }}>
            <Controller
                control={form.control}
                name={name}
                render={({ field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState, }) => {
                    return (
                        <TextField
                            onBlur={onBlur}
                            onChange={onChange}
                            inputRef={ref}
                            fullWidth
                            variant="outlined"
                            label={label}
                            error={!!hasError}
                            disabled={disabled}
                        />
                    )
                }}
            />
            <FormHelperText error={!!hasError}>
                {errors[name]?.message}
            </FormHelperText>
        </div>
    );
}

export default InputField;