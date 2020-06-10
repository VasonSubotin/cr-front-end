import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";

export const LoginForm = () => (
  <Grid component="form" container direction="column" alignItems="center" spacing={2}>
    <Grid item>
      <TextField required variant="outlined" label="Email" />
    </Grid>
    <Grid item>
      <TextField required variant="outlined" label="Password" type="password" />
    </Grid>
    <Grid item>
      <Button variant="outlined" color="primary">
        Sign in
      </Button>
    </Grid>
  </Grid>
);
