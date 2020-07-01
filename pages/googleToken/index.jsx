import React from "react";

import { serverAPI } from "api";
import { NonAuthLayout } from "components/Layout";
import { routes } from "config";

/**
 * Page handling Google Auth callback.
 */
const GoogleTokenPage = () => <NonAuthLayout>Authorizing on Ev-Charge...</NonAuthLayout>;

GoogleTokenPage.getInitialProps = async ({ query: { code }, res, req }) => {
  const redirect = (route) => {
    if (req && route.href) {
      res.writeHead(302, { Location: route.href });
      res.end();
    } else {
      console.error("[GoogleToken] Redirect is not possible.");
    }
  };

  if (!code) {
    redirect(routes.SIGN_IN);
  } else {
    const { response } = await serverAPI.startGoogleSession({ code });

    if (response.ok) {
      redirect(routes.MAIN);
    } else {
      console.error(
        "[GoogleToken]: Unable to start session:",
        response.data.status,
        response.data.message,
      );
      redirect(routes.SIGN_IN);
    }
  }
};

export default GoogleTokenPage;
