import React, { Component } from "react";

import { authActions, authServices } from "modules/auth";
import { routes } from "config";

const withNonAuthPageHoc = (WrappedComponent) =>
  class Auth extends Component {
    static getInitialProps = async (ctx) => {
      const redirect = (route) => {
        if (ctx.req && route.href) {
          ctx.res.writeHead(302, { Location: route.href });
          ctx.res.end();
        } else {
          console.error("[Auth page] Redirect is not possible.");
        }
      };

      const authCookies = authServices.getNextJsAuthCookies(ctx);
      const isAllAuthCookies = authServices.isAllAuthCookies(authCookies);

      if (isAllAuthCookies) {
        await ctx.store.dispatch(authActions.signInByCookiesRequest(authCookies));
        redirect(routes.MAIN);
      }

      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export const withNonAuthPage = withNonAuthPageHoc;
