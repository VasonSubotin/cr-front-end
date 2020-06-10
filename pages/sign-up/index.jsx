import React from "react";
import NextLink from "next/link";
import { Grid, Link, Typography } from "@material-ui/core";

import { routes } from "config";
import { NonAuthLayout } from "components/Layout";
import { SignUpForm } from "components/forms/SignUp";

/**
 * Sign up page.
 */
const HomePage = () => (
  <NonAuthLayout>
    <Grid container direction="column" alignItems="center" spacing={4}>
      <Grid item>
        <Typography variant="h4">Registration</Typography>
      </Grid>
      <Grid item>
        <SignUpForm />
      </Grid>
      <Grid item>
        <NextLink href={routes.SIGN_IN.href} passHref>
          <Link color="primary">Back to sign in page</Link>
        </NextLink>
      </Grid>
    </Grid>
  </NonAuthLayout>
);

export default HomePage;
