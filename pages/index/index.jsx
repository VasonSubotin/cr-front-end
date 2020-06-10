import React from "react";
import Link from "next/link";
import { Grid, Button } from "@material-ui/core";

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
        <LoginForm />
      </Grid>
      <Grid item>
        <Link href={routes.MAIN.href} passHref>
          <Button variant="outlined">Sign in with Google</Button>
        </Link>
      </Grid>
    </Grid>
  </NonAuthLayout>
);

export default HomePage;
