import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { debounce } from "utils/debounce";
import { manageEventListeners } from "utils/manageEventListeners";
import { getUuid } from "utils/getUuid";
import { consts, routes } from "config";
import { authActions, authServices, authSelectors } from "modules/auth";
import { uiActions } from "modules/ui";

const withAuthPageHoc = (WrappedComponent) =>
  class Auth extends Component {
    static getInitialProps = async (ctx) => {
      const authCookies = authServices.getNextJsAuthCookies(ctx);

      const isAllAuthCookies = authServices.isAllAuthCookies(authCookies);

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
      const {
        isSignedIn,
        signInByCookiesRequest,
        setSmartCarToken,
        authCookies,
        blurWindow,
      } = this.props;

      if (!isSignedIn) {
        signInByCookiesRequest(authCookies);
      }

      const smartCarToken = authServices.getSmartCarTokenCookie();

      if (smartCarToken) {
        setSmartCarToken(smartCarToken);
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
      const { signOutRequest } = this.props;

      const lastestActiveWindow = authServices.getLatestWindowIdCookie();
      if (lastestActiveWindow === this.uuid) {
        signOutRequest();
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
        signOutRequest,
        signInByCookiesRequest,
        setSmartCarToken,
        focusWindow,
        blurWindow,
        isSignedIn,
        ...rest
      } = this.props;
      return <WrappedComponent {...rest} />;
    }
  };

const mapStateToProps = (state) => ({
  isSignedIn: authSelectors.getIsSignedIn(state),
});

const mapDispatchToProps = (dispatch) => ({
  focusWindow: (uuid) => dispatch(uiActions.onWindowFocus(uuid)),
  blurWindow: () => dispatch(uiActions.onWindowBlur()),
  signOutRequest: () => dispatch(authActions.signOutRequest()),
  signInByCookiesRequest: (data) => dispatch(authActions.signInByCookiesRequest(data)),
  setSmartCarToken: (smartCarToken) => dispatch(authActions.setSmartCarToken(smartCarToken)),
});

export const withAuthPage = compose(connect(mapStateToProps, mapDispatchToProps), withAuthPageHoc);
