import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, Typography, Link, Button } from "@material-ui/core";

import { resourcesSelectors, resourcesActions } from "modules/resources";
import { PolicySelectDialog } from "components/PolicySelectDialog";
import { ValidatorDialog } from "components/ValidatorDialog";
import { ConfirmationDialog } from "components/ConfirmationDialog";
import { validateName } from "utils/validators";

const ValidatorDialogState = {
  NONE: null,
  NAME: "name",
};

const ConfirmationDialogState = {
  NONE: null,
  DELETE: "remove",
};

export const CarInfoComponent = ({
  selectedResource: car,
  showSchedule,
  deleteResource,
  updateResourcePolicyType,
  updateResourceName,
}) => {
  const [isShowPolicySelectDialog, setIsShowPolicySelectDialog] = useState(false);
  const [validatorDialogState, setValidatorDialogState] = useState(ValidatorDialogState.NONE);
  const [confirmationDialogState, setConfirmationDialogState] = useState(
    ConfirmationDialogState.NONE,
  );

  const renderValidatorDialog = () => {
    let title;
    let formData;
    let onValidated;

    switch (validatorDialogState) {
      case ValidatorDialogState.NAME:
        title = "Change car name";
        formData = {
          [ValidatorDialogState.NAME]: {
            validator: validateName,
            label: "Name",
            defaultValue: car.name || "",
          },
        };
        onValidated = ({ [ValidatorDialogState.NAME]: name }) =>
          updateResourceName(car.resourceId, name);
        break;
      default:
        title = null;
        formData = {};
        onValidated = () => ({});
    }

    return (
      <ValidatorDialog
        open={!!validatorDialogState}
        onClose={() => setValidatorDialogState(ValidatorDialogState.NONE)}
        proceedButtonText="Change"
        {...{ title, formData, onValidated }}
      />
    );
  };

  const renderConfirmationDialog = () => {
    let title;
    let text;
    let onConfirmed;

    switch (confirmationDialogState) {
      case ConfirmationDialogState.DELETE:
        title = "Car deletion";
        text = "Are you sure you want to delete the car?";
        onConfirmed = () => {
          deleteResource(car.resourceId);
          setConfirmationDialogState(ConfirmationDialogState.NONE);
        };
        break;
      default:
        title = null;
        text = null;
        onConfirmed = () => ({});
    }

    return (
      <ConfirmationDialog
        open={!!confirmationDialogState}
        onClose={() => setConfirmationDialogState(ConfirmationDialogState.NONE)}
        {...{ title, text, onConfirmed }}
      />
    );
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container wrap="nowrap" alignItems="center" spacing={2}>
            <Grid item>
              <Typography>
                <b>{car.name || car.resourceId}</b>
              </Typography>
            </Grid>
            <Grid item>
              <Link onClick={() => setValidatorDialogState(ValidatorDialogState.NAME)}>Edit</Link>
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
          <Grid container wrap="nowrap" alignItems="center" spacing={2}>
            <Grid item>
              <Typography>
                Policy type: <b>{car.policyType}</b>
              </Typography>
            </Grid>
            <Grid item>
              <Link onClick={() => setIsShowPolicySelectDialog(true)}>Edit</Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Button variant="outlined" onClick={showSchedule}>
                Request schedule
              </Button>
            </Grid>
            <Grid item>
              <Link onClick={() => setConfirmationDialogState(ConfirmationDialogState.DELETE)}>
                Delete car
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <PolicySelectDialog
        onSubmit={(policyType) => updateResourcePolicyType(car.resourceId, policyType)}
        open={isShowPolicySelectDialog}
        onClose={() => setIsShowPolicySelectDialog(false)}
      />
      {renderValidatorDialog()}
      {renderConfirmationDialog()}
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedResource: resourcesSelectors.getSelectedResource(state),
});

const mapDispatchToProps = (dispatch) => ({
  showSchedule: () => dispatch(resourcesActions.showSchedule()),
  deleteResource: (resourceId) => dispatch(resourcesActions.deleteResource(resourceId)),
  updateResourceName: (resourceId, name) =>
    dispatch(resourcesActions.updateResourceName(resourceId, name)),
  updateResourcePolicyType: (resourceId, policyType) =>
    dispatch(resourcesActions.updateResourcePolicyType(resourceId, policyType)),
  setSelectedResource: (resourceId) => dispatch(resourcesActions.setSelectedResource(resourceId)),
});

export const CarInfo = connect(mapStateToProps, mapDispatchToProps)(CarInfoComponent);
