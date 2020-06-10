import React from "react";
import NextLink from "next/link";
import { Grid, Button, TextField } from "@material-ui/core";

import { routes } from "config";

export const SignUpForm = () => (
  <Grid component="form" container direction="column" alignItems="center" spacing={2}>
    <Grid item>
      <TextField required variant="outlined" label="Email" />
    </Grid>
    <Grid item>
      <TextField required variant="outlined" label="Password" type="password" />
    </Grid>
    <Grid item>
      <TextField required variant="outlined" label="Confirm password" type="password" />
    </Grid>
    <Grid item>
      <NextLink href={routes.MAIN.href} passHref>
        <Button variant="outlined" color="primary">
          Sign up
        </Button>
      </NextLink>
    </Grid>
  </Grid>
);
