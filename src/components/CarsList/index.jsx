import React from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button, Card, CardContent, makeStyles } from "@material-ui/core";
import { DirectionsCar } from "@material-ui/icons";

import { authActions } from "modules/auth";
import { resourcesSelectors, resourcesActions } from "modules/resources";

const useStyles = makeStyles(() => ({
  card: {
    cursor: "pointer",
  },
}));

export const CarsListComponent = ({ resources, smartCarSignInRequest, setSelectedResource }) => {
  const classes = useStyles();

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
        <Grid
          key={item.resourceId}
          item
          xs={4}
          onClick={() => setSelectedResource(item.resourceId)}
        >
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography>
                Name: <b>{item.name || item.resourceId}</b>
              </Typography>
              <Typography>
                SOC: <b>{item.soc}%</b>
              </Typography>
              <Typography>
                Status:{" "}
                <b>{item.charging ? "Charging" : item.pluggedIn ? "Plugged In" : "Plugged out"}</b>
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
  smartCarSignInRequest: () => dispatch(authActions.smartCarSignInRequest()),
  setSelectedResource: (resourceId) => dispatch(resourcesActions.setSelectedResource(resourceId)),
});

export const CarsList = connect(mapStateToProps, mapDispatchToProps)(CarsListComponent);
