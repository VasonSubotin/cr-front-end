import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { authActions, authServices } from "modules/auth";

const withCookiesAuthAttemptHoc = (WrappedComponent) =>
  class Auth extends Component {
    static getInitialProps = async (ctx) => {
      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
      const authCookies = authServices.getNextJsAuthCookies(ctx);

      return { ...componentProps, authCookies };
    };

    componentDidMount() {
      const { signInByCookiesRequest, authCookies } = this.props;

      const isAllAuthCookies = authServices.isAllAuthCookies(authCookies);

      if (isAllAuthCookies) {
        signInByCookiesRequest(authCookies);
      }
    }

    render() {
      const { authCookies, signInByCookies, ...rest } = this.props;
      return <WrappedComponent {...rest} />;
    }
  };

const mapDispatchToProps = (dispatch) => ({
  signInByCookiesRequest: (data) => dispatch(authActions.signInByCookiesRequest(data)),
});

export const withCookiesAuthAttempt = compose(
  connect(null, mapDispatchToProps),
  withCookiesAuthAttemptHoc,
);
