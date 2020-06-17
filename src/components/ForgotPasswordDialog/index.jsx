import React from "react";
import { Dialog, DialogTitle, DialogContent, Grid, Typography } from "@material-ui/core";

import { ResetPasswordForm } from "components/forms/ResetPassword";

export const ForgotPasswordDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Recover password</DialogTitle>
    <DialogContent>
      <Grid container>
        <Grid item xs={12}>
          <Typography>
            Please enter the email address for your account. A verification code will be sent to
            you. Once you have received the verification code, you will be able to choose a new
            password for your account.
          </Typography>
        </Grid>
        <Grid item>
          <ResetPasswordForm />
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
);
