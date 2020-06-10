import React from "react";
import { Grid, Button } from "@material-ui/core";

import { NonAuthLayout } from "components/Layout";
import { LoginForm } from "components/forms/Login";

/**
 * Home (login) page.
 */
const HomePage = () => (
  <NonAuthLayout>
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <LoginForm />
      </Grid>
      <Grid item>
        <Button variant="outlined">Sign in with Google</Button>
      </Grid>
    </Grid>
  </NonAuthLayout>
);

export default HomePage;
