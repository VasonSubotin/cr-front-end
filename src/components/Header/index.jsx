import React from "react";
import NextLink from "next/link";
import { AppBar, Container, Button, Grid } from "@material-ui/core";

import { routes } from "config";

const links = [[routes.MAIN, routes.DEMO, routes.SESSION, routes.SETTINGS], [routes.SIGN_IN]];

/**
 * Website header.
 * Appears in auth state.
 */
export const Header = () => {
  const renderLinks = (links) =>
    links.map((route) => (
      <Grid item key={route.text}>
        <NextLink href={route.href} passHref>
          <Button variant="text">{route.text}</Button>
        </NextLink>
      </Grid>
    ));

  return (
    <AppBar color="inherit" position="fixed">
      <Container>
        <Grid container wrap="nowrap" justify="space-between" alignItems="center" spacing={2}>
          {links.map((linksGroup, index) => (
            <Grid key={index} item>
              <Grid container wrap="nowrap" alignItems="center" spacing={2}>
                {renderLinks(linksGroup)}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </AppBar>
  );
};
