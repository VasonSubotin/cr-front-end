import React, { useState } from "react";
import {
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

export const PolicySelectDialog = ({ onSubmit, open, onClose }) => {
  const [policy, setPolicy] = useState("SIMPLE");

  const handlePolicyChange = (event) => {
    setPolicy(event.target.value);
  };

  const handleSubmitClick = () => {
    onSubmit(policy);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Choose policy</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="policy"
                name="policy"
                value={policy}
                onChange={handlePolicyChange}
              >
                <FormControlLabel
                  value="SIMPLE"
                  control={<Radio />}
                  label="Charge car as fast as possible"
                />
                <FormControlLabel value="PRICE" control={<Radio />} label="Minimize costs" />
                <FormControlLabel value="ECO" control={<Radio />} label="Minimize CO2 emission" />
                <FormControlLabel
                  value="ECO_PRICE"
                  control={<Radio />}
                  label="Monetary savings - not to use energy during consumption peaks at grid"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item>
                <Button variant="outlined" onClick={handleSubmitClick}>
                  Update
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
};
