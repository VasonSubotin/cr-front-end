import React from "react";
import { Dialog, DialogTitle, DialogContent, Grid, Typography } from "@material-ui/core";

import { ValidatorForm } from "components/forms/Validator";

export const ValidatorDialog = ({
  open,
  onClose,
  title,
  text,
  formData,
  onValidated,
  proceedButtonText,
}) => {
  const handleFormValidated = (data) => {
    onValidated(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container justify="center" spacing={2}>
          {!!text && (
            <Grid item xs={12}>
              <Typography>{text}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <ValidatorForm
              formData={formData}
              onValidated={handleFormValidated}
              proceedButtonText={proceedButtonText}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
