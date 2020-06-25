import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";

import { validatePassword, validatePasswordMismatch } from "utils/validators";
import { useForm } from "components/hooks/useForm";

const FormFields = {
  CURRENT_PASSWORD: "current_password",
  NEW_PASSWORD: "new_password",
  NEW_PASSWORD_CONFIRMATION: "new_password_confirmation",
};

export const ChangePasswordForm = ({ onSubmitted }) => {
  const [processing, setProcessing] = useState(false);

  const { formFields, validateForm, handleFieldChange } = useForm({
    [FormFields.CURRENT_PASSWORD]: {
      validator: validatePassword,
      label: "Current password",
      defaultValue: "Test2Test",
    },
    [FormFields.NEW_PASSWORD]: {
      validator: validatePassword,
      label: "New password",
      defaultValue: "Test2Test",
    },
    [FormFields.NEW_PASSWORD_CONFIRMATION]: {
      validator: validatePasswordMismatch,
      validatorArgFields: [FormFields.NEW_PASSWORD, FormFields.NEW_PASSWORD_CONFIRMATION],
      label: "Repeat new password",
      defaultValue: "Test2Test",
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const isValidationFailed = validateForm();

    if (!isValidationFailed) {
      console.log("Password changed");
      onSubmitted();
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
          {...formFields[FormFields.CURRENT_PASSWORD]}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          disabled={processing}
          onChange={handleFieldChange}
          variant="outlined"
          {...formFields[FormFields.NEW_PASSWORD]}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          disabled={processing}
          onChange={handleFieldChange}
          variant="outlined"
          {...formFields[FormFields.NEW_PASSWORD_CONFIRMATION]}
        />
      </Grid>
      <Grid item>
        <Button disabled={processing} type="submit" variant="outlined" color="primary">
          Confirm
        </Button>
      </Grid>
    </Grid>
  );
};
