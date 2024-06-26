import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './autocomplete.scss';

const Autocompletes = ({
    customClass,
    options,
    value,
    onChange,
    name,
    isError,
    error,
    inputLabel,
    onInputChange,
    disabled,
    variant
}) => {

    return (
        <>
           <Autocomplete
                disablePortal
                disabled={disabled}
                options={options ?? []}
                getOptionLabel={(option) => option.label}
                getOptionSelected={(option) => option.title === ""}
                value={value}
                onChange={(event, value) => onChange(event, value)}
                onInputChange={onInputChange}
                className={['customAutoComplete', customClass].join(' ')}
                name={name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label={inputLabel ?? ''} variant={variant ?? "primary" | "outlined"} 
                />}
            />
            {
                isError && (<p>{error}</p>)
            }
        </>
    )
}

export default Autocompletes
