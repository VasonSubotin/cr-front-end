import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Button, TextField } from "@material-ui/core";

import { authActions } from "modules/auth";
import { validateEmail, validatePassword } from "utils/validators";
import { useForm } from "components/hooks/useForm";

const FormFields = {
  EMAIL: "email",
  PASSWORD: "password",
};

const SignInFormComponent = ({ signInRequest }) => {
  const [processing, setProcessing] = useState(false);

  const { formFields, validateForm, handleFieldChange } = useForm({
    [FormFields.EMAIL]: {
      validator: validateEmail,
      label: "Email",
    },
    [FormFields.PASSWORD]: {
      validator: validatePassword,
      label: "Password",
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const isValidationFailed = validateForm();

    if (!isValidationFailed) {
      await signInRequest(
        formFields[FormFields.EMAIL].value,
        formFields[FormFields.PASSWORD].value,
      );
    }

    setProcessing(false);
  };

  return (
    <Grid
      onSubmit={onSubmit}
      component="form"
      container
      direction="column"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <TextField
          disabled={processing}
          onChange={handleFieldChange}
          variant="outlined"
          {...formFields[FormFields.EMAIL]}
        />
      </Grid>
      <Grid item>
        <TextField
          disabled={processing}
          onChange={handleFieldChange}
          variant="outlined"
          {...formFields[FormFields.PASSWORD]}
        />
      </Grid>
      <Grid item>
        <Button
          disabled={processing}
          onChange={handleFieldChange}
          type="submit"
          variant="outlined"
          color="primary"
        >
          Sign in
        </Button>
      </Grid>
    </Grid>
  );
};

SignInFormComponent.propTypes = {
  signInRequest: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  signInRequest: (email, password) => dispatch(authActions.signInRequest(email, password)),
});

export const SignInForm = connect(null, mapDispatchToProps)(SignInFormComponent);
