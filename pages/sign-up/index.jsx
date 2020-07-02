import React, { useState } from "react";
import NextLink from "next/link";
import { Grid, Button, Typography } from "@material-ui/core";

import { routes } from "config";
import { withNonAuthPage } from "components/hoc/withNonAuthPage";
import { NonAuthLayout } from "components/Layout";
import { SignUpForm } from "components/forms/SignUp";

/**
 * Sign up page.
 */
const SignUpPage = () => {
  const [processingSignUp, setProcessingSignUp] = useState(false);

  const handleProcessingSignUpChange = (processing) => {
    setProcessingSignUp(processing);
  };

  return (
    <NonAuthLayout>
      <Grid container direction="column" alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="h4">Registration</Typography>
        </Grid>
        <Grid item>
          <SignUpForm onProcessingChange={handleProcessingSignUpChange} />
        </Grid>
        <Grid item>
          <NextLink href={routes.SIGN_IN.href} passHref>
            <Button variant="text" disabled={processingSignUp}>
              Back to sign in page
            </Button>
          </NextLink>
        </Grid>
      </Grid>
    </NonAuthLayout>
  );
};

export default withNonAuthPage(SignUpPage);
