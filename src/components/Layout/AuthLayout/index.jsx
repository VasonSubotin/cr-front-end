import React from "react";
import { Grid, Container, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import { useGlobalStyles } from "styles";
import { Header } from "components/Header";

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    paddingTop: spacing(8),
    paddingBottom: spacing(2),
  },
}));

export const AuthLayout = ({ children }) => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  return (
    <>
      <Header />
      <Container className={clsx(globalClasses.fullHeight, classes.container)}>
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
    </>
  );
};
