import React from "react";
import { Grid, Container, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import { useGlobalStyles } from "styles";

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    paddingTop: spacing(8),
    paddingBottom: spacing(2),
  },
}));

export const NonAuthLayout = ({ children }) => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  return (
    <Container className={clsx(globalClasses.fullHeight, classes.container)} maxWidth="xs">
      <Grid
        className={globalClasses.fullHeight}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        {children}
      </Grid>
    </Container>
  );
};
