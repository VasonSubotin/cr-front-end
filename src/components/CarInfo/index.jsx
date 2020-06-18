import React from "react";
import { connect } from "react-redux";
import { Grid, Typography, Link, Button } from "@material-ui/core";

import { resourcesSelectors, resourcesActions } from "modules/resources";

export const CarInfoComponent = ({ selectedResource: car, showSchedule }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Typography>
              <b>{car.name || car.resourceId}</b>
            </Typography>
          </Grid>
          <Grid item>
            <Link
              onClick={() => {
                console.log("Edit car name:", car.name || car.resourceId);
              }}
            >
              Edit
            </Link>
          </Grid>
        </Grid>
        <Typography>
          Battery capacity: <b>{car.capacity}%</b>
        </Typography>
        <Typography>
          SOC: <b>{car.soc}%</b>
        </Typography>
        <Typography>
          Plugged in: <b>{car.pluggedIn ? "true" : "false"}</b>
        </Typography>
        <Typography>
          Charging: <b>{car.charging ? "true" : "false"}</b>
        </Typography>
        <Typography>
          Policy type: <b>{car.policyType}</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="space-between" spacing={2}>
          <Grid item>
            <Button onClick={showSchedule}>Request schedule</Button>
          </Grid>
          <Grid item>
            <Link
              onClick={() => {
                console.log("Delete car:", car.name || car.resourceId);
              }}
            >
              Remove resource
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  selectedResource: resourcesSelectors.getSelectedResource(state),
});

const mapDispatchToProps = (dispatch) => ({
  showSchedule: () => dispatch(resourcesActions.showSchedule()),
});

export const CarInfo = connect(mapStateToProps, mapDispatchToProps)(CarInfoComponent);
