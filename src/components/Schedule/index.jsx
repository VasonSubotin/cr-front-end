import React from "react";
import { connect } from "react-redux";
import { Grid, Button, Typography } from "@material-ui/core";

import { resourcesSelectors, resourcesActions } from "modules/resources";

export const ScheduleComponent = ({ scheduleInfo, scheduleSuccess }) => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5">Your driving schedule</Typography>
      </Grid>
      <Grid item>
        <Typography>
          Session start time: <b>6:00PM</b>
        </Typography>
        <Typography>
          Session duration: <b>45 minutes</b>
        </Typography>
        <Typography>
          Energy needed: <b>10kWh</b>
        </Typography>
        <Typography>
          Location: <b>50.499745, 30.5131822</b>
        </Typography>
        <Typography>
          Adreess: <b>1300 El Camino Real, San Francisco</b>
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={scheduleSuccess}>
          Close
        </Button>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  scheduleInfo: resourcesSelectors.getScheduleInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  scheduleSuccess: () => dispatch(resourcesActions.scheduleSuccess()),
});

export const Schedule = connect(mapStateToProps, mapDispatchToProps)(ScheduleComponent);
