import React from 'react';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && error ? true : false}
    helperText={(touched && error) || ''}
    {...input}
    {...custom}
  />
);

export const renderSelectField = ({
  input,
  label,
  valuesArray,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    select
    label={label}
    margin="normal"
    error={touched && error ? true : false}
    helperText={(touched && error) || ''}
    {...input}
    {...custom}
  >
    {valuesArray.map(value => (
      <MenuItem key={value} value={value}>
        {value}
      </MenuItem>
    ))}
  </TextField>
);
