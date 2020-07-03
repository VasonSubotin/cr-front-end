import React from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button, Card, CardContent, makeStyles } from "@material-ui/core";
import { DirectionsCar } from "@material-ui/icons";

import { routes } from "config";
import { resourcesSelectors, resourcesActions } from "modules/resources";

const useStyles = makeStyles(() => ({
  card: {
    cursor: "pointer",
  },
}));

export const CarsListComponent = ({ resources, setSelectedResource }) => {
  const classes = useStyles();
  console.log(resources[0]);

  const renderEmptyList = () => (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <DirectionsCar fontSize="large" />
      </Grid>
      <Grid item>
        <Typography>You have not added your car yet</Typography>
      </Grid>
      <Grid item>
        <Button href={routes.SMART_CAR_SIGN_IN.href} variant="contained" color="primary">
          {routes.SMART_CAR_SIGN_IN.text}
        </Button>
      </Grid>
    </Grid>
  );

  const renderCarsList = () => (
    <Grid container spacing={2}>
      {resources.map((item) => (
        <Grid key={item.vehicleId} item xs={4} onClick={() => setSelectedResource(item.vehicleId)}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography>
                Name:{" "}
                <b>
                  {item.vehicleInfo
                    ? `${item.vehicleInfo.make} ${item.vehicleInfo.model}`
                    : "Just a car"}
                </b>
              </Typography>
              <Typography>
                Year:{" "}
                <b>
                  {item.vehicleInfo && item.vehicleInfo.year
                    ? item.vehicleInfo.year
                    : "Who knows..."}
                </b>
              </Typography>
              <Typography>
                VIN: <b>{item.vin ? item.vin : "Even no vin"}</b>
              </Typography>
              <Typography>
                SOC: <b>{item.soc}%</b>
              </Typography>
              <Typography>
                Status:{" "}
                <b>{item.charging ? "Charging" : item.pluggedIn ? "Plugged in" : "Plugged out"}</b>
              </Typography>
              <Typography>
                Policy type: <b>{item.policyType}</b>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return resources.length > 0 ? renderCarsList() : renderEmptyList();
};

const mapStateToProps = (state) => ({
  resources: resourcesSelectors.getResources(state),
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedResource: (resourceId) => dispatch(resourcesActions.setSelectedResource(resourceId)),
});

export const CarsList = connect(mapStateToProps, mapDispatchToProps)(CarsListComponent);
