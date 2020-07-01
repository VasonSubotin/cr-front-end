import React, { useState } from "react";
import NextLink from "next/link";
import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";

import { routes } from "config";
import { authActions } from "modules/auth";
import { NonAuthLayout } from "components/Layout";
import { SignInForm } from "components/forms/SignIn";
import { FormDialog } from "components/FormDialog";
import { ResetPasswordForm } from "components/forms/ResetPassword";

/**
 * Home (login) page.
 */
const HomePageComponent = () => {
  const [processing, setProcessing] = useState(false);
  const [isShowResetPasswordDialog, setIsShowResetPasswordDialog] = useState(false);

  return (
    <NonAuthLayout>
      <Grid container justify="center" spacing={4}>
        <Grid item>
          <NextLink href={routes.GOOGLE_SIGN_IN.href} passHref>
            <Button disabled={processing} variant="outlined" color="primary">
              {routes.GOOGLE_SIGN_IN.text}
            </Button>
          </NextLink>
        </Grid>
        <Grid item xs={12}>
          <SignInForm disabled={processing} />
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="space-between">
            <Grid item>
              <NextLink href={routes.SIGN_UP.href} passHref>
                <Button variant="text" disabled={processing}>
                  {routes.SIGN_UP.text}
                </Button>
              </NextLink>
            </Grid>
            <Grid item>
              <Button
                variant="text"
                disabled={processing}
                onClick={() => setIsShowResetPasswordDialog(true)}
              >
                Forgot password?
              </Button>
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

const mapDispatchToProps = (dispatch) => ({
  signInByGoogleRequest: (gapi) => dispatch(authActions.signInByGoogleRequest(gapi)),
});

export default connect(null, mapDispatchToProps)(HomePageComponent);
