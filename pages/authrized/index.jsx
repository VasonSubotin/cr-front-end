import React, { useEffect } from "react";
import Router from "next/router";
import { compose } from "redux";
import { connect } from "react-redux";

import { serverAPI } from "api";
import { withAuthPage } from "components/hoc/withAuthPage";
import { NonAuthLayout } from "components/Layout";
import { routes } from "config";
import { authActions } from "modules/auth";

/**
 * Page handling SmartCar Auth callback.
 */
const AuthorizedPage = ({ smartCarToken, setSmartCarToken }) => {
  useEffect(() => {
    const setSmartCarTokenEffect = async () => {
      const { response } = await serverAPI.startSmartCarSession({ code: smartCarToken });
      console.log(response);

      if (response.ok) {
        await setSmartCarToken(smartCarToken);
      } else {
        console.error(
          "[SmartCarSession]: Unable to start session:",
          response.data.status,
          response.data.message,
        );
      }

      Router.push(routes.MAIN.href);
    };

    setSmartCarTokenEffect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <NonAuthLayout>Authorizing on Ev-Charge...</NonAuthLayout>;
};

AuthorizedPage.getInitialProps = async ({ query: { code }, res, req, store }) => {
  const redirect = (route) => {
    if (req && route.href) {
      res.writeHead(302, { Location: route.href });
      res.end();
    } else {
      console.error("[SmartCarToken page] Redirect is not possible.");
    }
  };

  if (!code) {
    console.log("[SmartCarToken page] Token not provided. Redirecting to main page...");
    redirect(routes.MAIN);
  }

  return { smartCarToken: code };
};

const mapDispatchToProps = (dispatch) => ({
  setSmartCarToken: (smartCarToken) => dispatch(authActions.setSmartCarToken(smartCarToken)),
});

export default compose(connect(null, mapDispatchToProps), withAuthPage)(AuthorizedPage);
