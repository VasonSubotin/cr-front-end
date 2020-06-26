import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";

import { consts } from "config";
import { validateEmail } from "utils/validators";
import { useForm } from "components/hooks/useForm";

const FormFields = {
  EMAIL: "email",
};

export const ResetPasswordForm = () => {
  const [processing, setProcessing] = useState(false);

  const { formFields, validateForm, handleFieldChange } = useForm({
    [FormFields.EMAIL]: {
      validator: validateEmail,
      label: "Email",
      defaultValue: consts.DEFAULT_EMAIL,
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const isValidationFailed = validateForm();

    if (!isValidationFailed) {
      console.log("Sending recover letter to email:", formFields[FormFields.EMAIL].value);
    }

    setProcessing(false);
  };

  return (
    <Grid onSubmit={onSubmit} component="form" container justify="center" spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          disabled={processing}
          onChange={handleFieldChange}
          variant="outlined"
          {...formFields[FormFields.EMAIL]}
        />
      </Grid>
      <Grid item>
        <Button disabled={processing} type="submit" variant="outlined" color="primary">
          Reset
        </Button>
      </Grid>
    </Grid>
  );
};
