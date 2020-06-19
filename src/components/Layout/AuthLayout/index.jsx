import React from "react";
import { Grid, Container, IconButton, makeStyles } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import clsx from "clsx";

import { useGlobalStyles } from "styles";
import { Header } from "components/Header";

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    paddingTop: spacing(8),
    paddingBottom: spacing(2),
  },

  content: {
    position: "relative",

    "&.with-button": {
      paddingTop: spacing(5),
    },
  },

  backButton: {
    position: "absolute",
    left: 0,
    top: 0,
  },
}));

export const AuthLayout = ({ children, onBackClick }) => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  return (
    <>
      <Header />
      <Container className={clsx(globalClasses.fullHeight, classes.container)}>
        <Grid
          className={clsx(
            globalClasses.fullHeight,
            classes.content,
            !!onBackClick && "with-button",
          )}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          {!!onBackClick && (
            <IconButton className={classes.backButton} onClick={onBackClick}>
              <ArrowBack />
            </IconButton>
          )}
          {children}
        </Grid>
      </Container>
    </>
  );
};
