import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Button,
  Link,
} from "@material-ui/core";

export const ConfirmationDialog = ({ open, onClose, onConfirmed, title, text }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Grid container justify="center" spacing={2}>
        {!!text && (
          <Grid item xs={12}>
            <Typography>{text}</Typography>
          </Grid>
        )}
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button variant="outlined" onClick={onConfirmed}>
                Confirm
              </Button>
            </Grid>
            <Grid item>
              <Link onClick={onClose}>Cancel</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
);
