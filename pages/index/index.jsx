import React from "react";
import NextLink from "next/link";
import { Grid, Button, Link } from "@material-ui/core";

import { routes } from "config";
import { NonAuthLayout } from "components/Layout";
import { LoginForm } from "components/forms/Login";

/**
 * Home (login) page.
 */
const HomePage = () => (
  <NonAuthLayout>
    <Grid container direction="column" alignItems="center" spacing={4}>
      <Grid item>
        <NextLink href={routes.MAIN.href} passHref>
          <Button variant="outlined">Sign in with Google</Button>
        </NextLink>
      </Grid>
      <Grid item>
        <LoginForm />
      </Grid>
      <Grid item>
        <NextLink href={routes.SIGN_UP.href} passHref>
          <Link color="primary">Sign up</Link>
        </NextLink>
      </Grid>
    </Grid>
  </NonAuthLayout>
);

export default HomePage;
