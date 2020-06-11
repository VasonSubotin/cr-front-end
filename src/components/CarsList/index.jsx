import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button } from "@material-ui/core";
import { DirectionsCar } from "@material-ui/icons";

export const CarsList = ({ onAddCarClick }) => (
  <Grid container direction="column" alignItems="center" spacing={2}>
    <Grid item>
      <DirectionsCar fontSize="large" />
    </Grid>
    <Grid item>
      <Typography>You have not added your car yet</Typography>
    </Grid>
    <Grid item>
      <Button onClick={onAddCarClick} variant="contained" color="primary">
        Add a car
      </Button>
    </Grid>
  </Grid>
);

CarsList.propTypes = {
  onAddCarClick: PropTypes.func.isRequired,
};
