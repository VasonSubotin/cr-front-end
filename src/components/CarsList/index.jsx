import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { DirectionsCar } from "@material-ui/icons";

import { authActions } from "modules/auth";

export const CarsListComponent = ({ smartCarSignInRequest }) => (
  <Grid container direction="column" alignItems="center" spacing={2}>
    <Grid item>
      <DirectionsCar fontSize="large" />
    </Grid>
    <Grid item>
      <Typography>You have not added your car yet</Typography>
    </Grid>
    <Grid item>
      <Button onClick={smartCarSignInRequest} variant="contained" color="primary">
        Add a car
      </Button>
    </Grid>
  </Grid>
);

CarsListComponent.propTypes = {
  smartCarSignInRequest: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  smartCarSignInRequest: () => dispatch(authActions.smartCarSignInRequest()),
});

export const CarsList = connect(null, mapDispatchToProps)(CarsListComponent);
