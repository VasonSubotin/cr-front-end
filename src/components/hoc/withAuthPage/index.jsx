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

      if (ctx.req && !isAllAuthCookies) {
        redirect(routes.SIGN_IN);
      } else {
        authServices.setAuthCookiesExpiration(consts.ONE_DAY);
      }

      const isSignedIn = authSelectors.getIsSignedIn(ctx.store.getState());
      if (!isSignedIn) {
        await ctx.store.dispatch(authActions.signInByCookiesRequest(authCookies));
      }

      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    };

    constructor(props) {
      super(props);

      this.uuid = getUuid();
    }

    componentDidMount() {
      const { blurWindow } = this.props;

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
        const { signOutRequest } = this.props;

        signOutRequest();
      }
    };

    render() {
      const { signOut, focusWindow, blurWindow, ...rest } = this.props;
      return <WrappedComponent {...rest} />;
    }
  };

const mapDispatchToProps = (dispatch) => ({
  focusWindow: (uuid) => dispatch(uiActions.onWindowFocus(uuid)),
  blurWindow: () => dispatch(uiActions.onWindowBlur()),
  signOutRequest: () => dispatch(authActions.signOutRequest()),
});

export const withAuthPage = compose(connect(null, mapDispatchToProps), withAuthPageHoc);
