import React, { useEffect } from "react";
import Router from "next/router";
import { compose } from "redux";
import { connect } from "react-redux";

import { withAuthPage } from "components/hoc/withAuthPage";
import { NonAuthLayout } from "components/Layout";
import { routes } from "config";
import { authActions } from "modules/auth";

/**
 * Page handling SmartCar Auth callback.
 */
const SmartCarTokenPage = ({ smartCarToken, setSmartCarToken }) => {
  useEffect(() => {
    const setSmartCarTokenEffect = async () => {
      await setSmartCarToken(smartCarToken);

      Router.push(routes.MAIN.href);
    };

    setSmartCarTokenEffect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <NonAuthLayout>Authorizing on Ev-Charge...</NonAuthLayout>;
};

SmartCarTokenPage.getInitialProps = async ({ query: { code }, res, req }) => {
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

export default compose(withAuthPage, connect(null, mapDispatchToProps))(SmartCarTokenPage);
