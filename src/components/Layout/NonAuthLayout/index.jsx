import React from "react";
import { Grid } from "@material-ui/core";

import { useGlobalStyles } from "styles";

export const NonAuthLayout = ({ children }) => {
  const globalClasses = useGlobalStyles();

  return (
    <Grid
      className={globalClasses.fullHeight}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      {children}
    </Grid>
  );
};
