import React from "react";
import { Grid, Container } from "@material-ui/core";

import { useGlobalStyles } from "styles";
import { Header } from "components/Header";

export const AuthLayout = ({ children }) => {
  const globalClasses = useGlobalStyles();

  return (
    <>
      <Header />
      <Container className={globalClasses.fullHeight}>
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
