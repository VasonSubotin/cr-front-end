import React from "react";

import { serverAPI } from "api";
import { NonAuthLayout } from "components/Layout";
import { routes } from "config";

/**
 * Page handling SmartCar Auth callback.
 */
const AuthorizedPage = () => <NonAuthLayout>Authorizing on Ev-Charge...</NonAuthLayout>;

AuthorizedPage.getInitialProps = async ({ query: { code }, res, req }) => {
  const redirect = (route) => {
    if (req && route.href) {
      res.writeHead(302, { Location: route.href });
      res.end();
    } else {
      console.error("[SmartCarToken page] Redirect is not possible.");
    }
  };

  if (!code) {
    redirect(routes.SIGN_IN);
  } else {
    const { response } = await serverAPI.startSmartCarSession({ code });

    if (response.ok) {
      redirect(routes.MAIN);
    } else {
      console.error(
        "[SmartCarSession]: Unable to start session:",
        response.data.status,
        response.data.message,
      );
      redirect(routes.SIGN_IN);
    }
  }
};

export default AuthorizedPage;
