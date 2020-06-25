import React from "react";
import { Dialog, DialogTitle, DialogContent, Grid, Typography } from "@material-ui/core";

export const FormDialog = ({ open, onClose, title, text, children }) => (
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
          {children}
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
);
