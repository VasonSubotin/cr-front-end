import React from "react";
import Head from "next/head";
import App from "next/app";
import { END } from "redux-saga";
import { ThemeProvider, CssBaseline } from "@material-ui/core";

import { storeWrapper } from "store";
import { appTheme } from "styles";

/**
 * Custom "_app" component.
 * Connects MUI and redux-saga to the application.
 */
class WrappedApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>EV Charge</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

WrappedApp.getInitialProps = async ({ Component, ctx }) => {
  // Wait for all page actions to dispatch.
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  };

  // Stop the saga if on server.
  if (ctx.req) {
    ctx.store.dispatch(END);
    await ctx.store.sagaTask.toPromise();
  }

  return { pageProps };
};

export default storeWrapper.withRedux(WrappedApp);
