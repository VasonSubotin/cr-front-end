import React, { useState } from "react";
import {
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

export const PolicySelector = ({ onSubmit }) => {
  const [value, setValue] = useState("SIMPLE");
  // const [showAgain, setShowAgain] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Grid container direction="column">
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
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
  );
};
