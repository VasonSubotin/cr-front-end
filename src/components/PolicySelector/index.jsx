import React, { useState } from "react";
import {
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
} from "@material-ui/core";

export const PolicySelector = ({ onSubmit }) => {
  const [policy, setPolicy] = useState("SIMPLE");
  const [showAgain, setShowAgain] = useState(false);

  const handlePolicyChange = (event) => {
    setPolicy(event.target.value);
  };

  const handleAskAgainChange = () => {
    setShowAgain(!showAgain);
  };

  const handleSubmitClick = () => {
    onSubmit({ policy, showAgain });
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose your policy:</FormLabel>
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
          <FormControlLabel
            control={<Checkbox checked={showAgain} onChange={handleAskAgainChange} name="gilad" />}
            label="Don't ask again. You have possibility to change policy in settings."
          />
        </FormControl>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={handleSubmitClick}>
          Request
        </Button>
      </Grid>
    </Grid>
  );
};
