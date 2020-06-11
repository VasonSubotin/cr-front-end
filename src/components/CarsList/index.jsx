import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { DirectionsCar } from "@material-ui/icons";

export const CarsList = () => (
  <Grid container direction="column" alignItems="center" spacing={2}>
    <Grid item>
      <DirectionsCar fontSize="large" />
    </Grid>
    <Grid item>
      <Typography>You have not added your car yet</Typography>
    </Grid>
    <Grid item>
      <Button variant="contained" color="primary">
        Add a car
      </Button>
    </Grid>
  </Grid>
);
