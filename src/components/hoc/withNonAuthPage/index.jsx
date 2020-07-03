import React, { Component } from "react";
import Router from "next/router";
import { compose } from "redux";
import { connect } from "react-redux";

import { authSelectors, authServices } from "modules/auth";
import { routes } from "config";

const withNonAuthPageHoc = (WrappedComponent) =>
  class Auth extends Component {
    static getInitialProps = async (ctx) => {
      const authCookies = authServices.getNextJsAuthCookies(ctx);

      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, authCookies };
    };

    componentDidMount() {
      const { isSignedIn, authCookies } = this.props;

      const isAllAuthCookies = authServices.isAllAuthCookies(authCookies);

      if (isAllAuthCookies || isSignedIn) {
        Router.push(routes.MAIN.href);
      }
    }

    render() {
      const { signInByCookiesRequest, isSignedIn, authCookies, ...rest } = this.props;

      return <WrappedComponent {...rest} />;
    }
  };

const mapStateToProps = (state) => ({
  isSignedIn: authSelectors.getIsSignedIn(state),
});

export const withNonAuthPage = compose(connect(mapStateToProps, null), withNonAuthPageHoc);
