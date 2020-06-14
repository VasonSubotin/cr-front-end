import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";

import { debounce } from "utils/debounce";
import { manageEventListeners } from "utils/manageEventListeners";
import { getUuid } from "utils/getUuid";
import { consts, routes } from "config";
import { authActions, authServices, authSelectors, authPropTypes } from "modules/auth";
import { uiActions, uiSelectors } from "modules/ui";

const withAuthHoc = (WrappedComponent) =>
  class Auth extends Component {
    static getInitialProps = async (ctx) => {
      const authCookies = authServices.getNextJsAuthCookies(ctx);

      const isAllAuthCookies = authServices.isAllAuthCookies(authCookies);

      console.log(ctx.res);
      if (ctx.req && !isAllAuthCookies) {
        ctx.res.writeHead(302, { Location: routes.SIGN_IN.href });
        ctx.res.end();
        return;
      }

      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, authCookies };
    };

    constructor(props) {
      super(props);

      this.uuid = getUuid();
    }

    componentDidMount() {
      const { isSignedIn, signInByCookies, authCookies, blurWindow } = this.props;

      if (!isSignedIn) {
        signInByCookies(authCookies);
      }

      this.focusWindow();

      // Handle sync logout
      window.addEventListener("storage", this.syncLogout);

      // Session management on window blur/focus
      window.addEventListener("focus", this.focusWindow);
      window.addEventListener("blur", blurWindow);

      // Session management on user activity
      manageEventListeners(
        "addEventListener",
        consts.SESSION_CONTINUE_EVENTS,
        this.continueSession,
      );

      // Update cookies expiration time on window close
      window.onunload = this.onWindowClose();
    }

    componentWillUnmount() {
      const { blurWindow } = this.props;

      window.removeEventListener("storage", this.syncLogout);
      window.removeEventListener("focus", this.focusWindow);
      window.removeEventListener("blur", blurWindow);
      manageEventListeners(
        "removeEventListener",
        consts.SESSION_CONTINUE_EVENTS,
        this.continueSession,
      );

      window.localStorage.removeItem("logout");
    }

    onWindowClose = () => {
      const lastestActiveWindow = authServices.getLatestWindowIdCookie();
      if (lastestActiveWindow === this.uuid) {
        authServices.setAuthCookiesExpiration(consts.SESSION_EXPIRE_CLOSED_PAGE);
      }
    };

    focusWindow = () => {
      const { focusWindow } = this.props;
      focusWindow();

      authServices.setAuthCookiesExpiration(consts.ONE_DAY);
      authServices.setLatestWindowIdCookie(this.uuid);
    };

    continueSession = debounce(() => {
      const { signOut } = this.props;

      const lastestActiveWindow = authServices.getLatestWindowIdCookie();
      if (lastestActiveWindow === this.uuid) {
        signOut();
      }
    }, consts.SESSION_EXPIRE_ACTIVE_PAGE);

    syncLogout = (e) => {
      if (e.key === "logout") {
        const { signOut } = this.props;

        signOut();
      }
    };

    render() {
      const {
        authCookies,
        signOut,
        signInByCookies,
        focusWindow,
        blurWindow,
        isSignedIn,
        isFocused,
        ...rest
      } = this.props;
      return <WrappedComponent {...rest} />;
    }
  };

withAuthHoc.propTypes = {
  authCookies: authPropTypes.AUTH_COOKIES,
  signOut: PropTypes.func.isRequired,
  signInByCookies: PropTypes.func.isRequired,
  focusWindow: PropTypes.func.isRequired,
  blurWindow: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
  isFocused: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isSignedIn: authSelectors.getIsSignedIn(state),
  isFocused: uiSelectors.getIsFocused(state),
});

const mapDispatchToProps = (dispatch) => ({
  focusWindow: (uuid) => dispatch(uiActions.onWindowFocus(uuid)),
  blurWindow: () => dispatch(uiActions.onWindowBlur()),
  signOut: () => dispatch(authActions.signOutRequest()),
  signInByCookies: (data) => dispatch(authActions.signInByCookiesRequest(data)),
});

export const withAuth = compose(connect(mapStateToProps, mapDispatchToProps), withAuthHoc);
