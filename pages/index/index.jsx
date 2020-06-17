import React, { useState } from "react";
import NextLink from "next/link";
import { Grid, Button, Link } from "@material-ui/core";

import { routes } from "config";
import { NonAuthLayout } from "components/Layout";
import { SignInForm } from "components/forms/SignIn";
import { ResetPasswordDialog } from "components/ResetPasswordDialog";

/**
 * Home (login) page.
 */
const HomePage = () => {
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);

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
              <Link color="primary" onClick={() => setShowResetPasswordDialog(true)}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ResetPasswordDialog
        open={showResetPasswordDialog}
        onClose={() => setShowResetPasswordDialog(false)}
      />
    </NonAuthLayout>
  );
};

export default HomePage;
