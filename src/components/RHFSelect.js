import React from 'react'
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from '@mui/material'

export default function RHFSelect({ name, children, label, ...others }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    label={label}
                    select
                    fullWidth
                    error={!!error}
                    {...others}
                >
                    {children}
                </TextField>
            )}
        />
    )
}