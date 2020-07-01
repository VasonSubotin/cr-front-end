import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, Button, TextField } from "@material-ui/core";

import { consts } from "config";
import { authActions } from "modules/auth";
import { validateEmail, validatePassword, validatePasswordMismatch } from "utils/validators";
import { useForm } from "components/hooks/useForm";

const FormFields = {
  EMAIL: "email",
  PASSWORD: "password",
  PASSWORD_CONFIRMATION: "password_confirmation",
};

export const SignUpFormComponent = ({ disabled, signUpRequest, onProcessingChange }) => {
  const [processing, setProcessing] = useState(false);

  const { formFields, validateForm, handleFieldChange } = useForm({
    [FormFields.EMAIL]: {
      validator: validateEmail,
      label: "Email",
      defaultValue: consts.DEFAULT_EMAIL,
    },
    [FormFields.PASSWORD]: {
      validator: validatePassword,
      label: "Password",
      defaultValue: consts.DEFAULT_PASSWORD,
    },
    [FormFields.PASSWORD_CONFIRMATION]: {
      validator: validatePasswordMismatch,
      validatorArgFields: [FormFields.PASSWORD, FormFields.PASSWORD_CONFIRMATION],
      label: "Confirm password",
      defaultValue: consts.DEFAULT_PASSWORD,
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    onProcessingChange(true);

    const isValidationFailed = validateForm();

    if (!isValidationFailed) {
      await signUpRequest(
        formFields[FormFields.EMAIL].value,
        formFields[FormFields.PASSWORD].value,
      );
    }

    setProcessing(false);
    onProcessingChange(false);
  };

  const renderFormField = (fieldName) => (
    <Grid item xs={12}>
      <TextField
        fullWidth
        disabled={processing || disabled}
        onChange={handleFieldChange}
        variant="outlined"
        {...formFields[fieldName]}
      />
    </Grid>
  );

  return (
    <Grid onSubmit={onSubmit} component="form" container justify="center" spacing={2}>
      {renderFormField(FormFields.EMAIL)}
      {renderFormField(FormFields.PASSWORD)}
      {renderFormField(FormFields.PASSWORD_CONFIRMATION)}
      <Grid item>
        <Button disabled={processing} type="submit" variant="outlined" color="primary">
          Sign up
        </Button>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpRequest: (email, password) => dispatch(authActions.signUpRequest(email, password)),
});

export const SignUpForm = connect(null, mapDispatchToProps)(SignUpFormComponent);
