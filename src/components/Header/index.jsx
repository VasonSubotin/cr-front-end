import React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import { connect } from "react-redux";
import { AppBar, Container, Button, Grid } from "@material-ui/core";

import { authActions } from "modules/auth";
import { routes } from "config";

const pagesLinks = [routes.MAIN, routes.DEMO, routes.SESSION, routes.SETTINGS];

/**
 * Website header.
 * Appears in auth state.
 */
const HeaderComponent = ({ signOutRequest }) => {
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
          <Grid item>
            <Grid container wrap="nowrap" alignItems="center" spacing={2}>
              {renderLinks(pagesLinks)}
            </Grid>
          </Grid>
          <Grid item>
            <Button onClick={signOutRequest} variant="text">
              Sign out
            </Button>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

HeaderComponent.propTypes = {
  signOutRequest: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  signOutRequest: (email, password) => dispatch(authActions.signOutRequest(email, password)),
});

export const Header = connect(null, mapDispatchToProps)(HeaderComponent);
