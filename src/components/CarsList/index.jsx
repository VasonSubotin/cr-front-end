import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Typography, Button, Card, CardContent, CardActions } from "@material-ui/core";
import { DirectionsCar } from "@material-ui/icons";

import { authActions } from "modules/auth";
import { resourcesSelectors } from "modules/resources";

export const CarsListComponent = ({ resources, smartCarSignInRequest }) => {
  const renderEmptyList = () => (
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

  const renderCarsList = () => (
    <Grid container spacing={2}>
      {resources.map((item) => (
        <Grid key={item.resourceId} item xs={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography>
                ID: <b>{item.resourceId}</b>
              </Typography>
              <Typography>
                Policy type: <b>{item.policyType}</b>
              </Typography>
              <Typography>
                Battery capacity: <b>{item.capacity}kWh</b>
              </Typography>
              <Typography>
                SOC: <b>{item.soc}%</b>
              </Typography>
              <Typography>
                Plugged in: <b>{item.pluggedIn ? "true" : "false"}</b>
              </Typography>
              <Typography>
                Charging: <b>{item.charging ? "true" : "false"}</b>
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined">Request schedule</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return resources.length > 0 ? renderCarsList() : renderEmptyList();
};

CarsListComponent.propTypes = {
  smartCarSignInRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  resources: resourcesSelectors.getResources(state),
});

const mapDispatchToProps = (dispatch) => ({
  smartCarSignInRequest: () => dispatch(authActions.smartCarSignInRequest()),
});

export const CarsList = connect(mapStateToProps, mapDispatchToProps)(CarsListComponent);
