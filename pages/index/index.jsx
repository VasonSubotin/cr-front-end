import React, { useState } from "react";
import NextLink from "next/link";
import { Grid, Button, Link } from "@material-ui/core";

import { routes } from "config";
import { NonAuthLayout } from "components/Layout";
import { SignInForm } from "components/forms/SignIn";
import { FormDialog } from "components/FormDialog";
import { ResetPasswordForm } from "components/forms/ResetPassword";

/**
 * Home (login) page.
 */
const HomePage = () => {
  const [isShowResetPasswordDialog, setIsShowResetPasswordDialog] = useState(false);

  return (
    <NonAuthLayout>
      <Grid container justify="center" spacing={4}>
        <Grid item>
          <NextLink href={routes.MAIN.href} passHref>
            <Button variant="outlined" color="primary">
              Sign in with Google
            </Button>
          </NextLink>
        </Grid>
        <Grid item xs={12}>
          <SignInForm />
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="space-between">
            <Grid item>
              <NextLink href={routes.SIGN_UP.href} passHref>
                <Link color="primary">Sign up</Link>
              </NextLink>
            </Grid>
            <Grid item>
              <Link color="primary" onClick={() => setIsShowResetPasswordDialog(true)}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <FormDialog
        title="Reset password"
        text="Please enter the email address for your account. A verification code will be sent to you. Once you have received the verification code, you will be able to choose a new password for your account."
        open={isShowResetPasswordDialog}
        onClose={() => setIsShowResetPasswordDialog(false)}
      >
        <ResetPasswordForm />
      </FormDialog>
    </NonAuthLayout>
  );
};

export default HomePage;
