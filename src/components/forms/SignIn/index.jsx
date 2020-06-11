import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Button, TextField } from "@material-ui/core";

import { authActions } from "modules/auth";
import { validateEmail, validatePassword } from "utils/validators";

const SignInFormComponent = ({ signInRequest }) => {
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onFieldChange = (name) => {
    setErrors({ ...errors, [name]: null });
  };

  const submit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    const formErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    setErrors(formErrors);

    if (!formErrors.email && !formErrors.password) {
      await signInRequest(email, password);
    }

    setProcessing(false);
  };

  return (
    <Grid
      onSubmit={submit}
      component="form"
      container
      direction="column"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <TextField
          onChange={() => onFieldChange("email")}
          disabled={processing}
          variant="outlined"
          label="Email"
          error={!!errors.email}
          helperText={errors.email}
          inputProps={{
            ref: emailRef,
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          onChange={() => onFieldChange("password")}
          disabled={processing}
          variant="outlined"
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password}
          inputProps={{
            ref: passwordRef,
          }}
        />
      </Grid>
      <Grid item>
        <Button type="submit" disabled={processing} variant="outlined" color="primary">
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
