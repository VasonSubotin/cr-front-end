import React from "react";

import { serverAPI } from "api";
import { withAuthPage } from "components/hoc/withAuthPage";
import { NonAuthLayout } from "components/Layout";
import { routes } from "config";
import { authActions } from "modules/auth";

/**
 * Page handling SmartCar Auth callback.
 */
const AuthorizedPage = () => <NonAuthLayout>Authorizing on Ev-Charge...</NonAuthLayout>;

AuthorizedPage.getInitialProps = async ({ query: { code }, res, req, store }) => {
  const redirect = (route) => {
    if (req && route.href) {
      res.writeHead(302, { Location: route.href });
      res.end();
    } else {
      console.error("[SmartCarToken page] Redirect is not possible.");
    }
  };

  console.log(code);
  if (!code) {
    // redirect(routes.MAIN);
  } else {
    const { response } = await serverAPI.startSmartCarSession({ code });
    console.log(code);
    console.log(response);

    if (response.ok) {
      await store.dispatch(authActions.setSmartCarToken(code));
      // redirect(routes.MAIN);
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

export default withAuthPage(AuthorizedPage);
