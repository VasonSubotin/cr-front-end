import React from "react";
import NextLink from "next/link";
import { AppBar, Container, Button, Grid } from "@material-ui/core";

import { routes } from "config";

/**
 * Website header.
 * Appears in auth state.
 */
export const Header = () => {
  const renderLinks = () =>
    [routes.MAIN, routes.DEMO, routes.SESSION, routes.SETTINGS].map((route) => (
      <Grid item>
        <NextLink href={route.href} passHref>
          <Button variant="text">{route.text}</Button>
        </NextLink>
      </Grid>
    ));

  return (
    <AppBar color="inherit" position="fixed">
      <Container>
        <Grid container wrap="nowrap" justify="center" alignItems="center" spacing={2}>
          {renderLinks()}
        </Grid>
      </Container>
    </AppBar>
  );
};
