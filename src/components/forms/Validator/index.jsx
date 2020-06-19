import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";

import { useForm } from "components/hooks/useForm";

export const ValidatorForm = ({ onValidated, formData }) => {
  const { formFields, getFormFieldsValues, validateForm, handleFieldChange } = useForm(formData);

  const onSubmit = async (event) => {
    event.preventDefault();

    const isValidationFailed = validateForm();

    if (!isValidationFailed) {
      onValidated(getFormFieldsValues());
    }
  };

  const renderFormFields = () =>
    Object.keys(formFields).map((key) => (
      <Grid item xs={12}>
        <TextField fullWidth onChange={handleFieldChange} variant="outlined" {...formFields[key]} />
      </Grid>
    ));

  return (
    <Grid onSubmit={onSubmit} component="form" container justify="center" spacing={2}>
      {renderFormFields()}
      <Grid item>
        <Button type="submit" variant="outlined" color="primary">
          Sign in
        </Button>
      </Grid>
    </Grid>
  );
};
