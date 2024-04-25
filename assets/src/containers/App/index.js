import React,{Suspense} from "react";
import { connect } from "react-redux";
import URLSearchParams from "url-search-params";
import { Redirect, Route, Switch } from "react-router-dom";
import { LocaleProvider, Spin } from "antd";
import { ToastContainer } from "react-toastify";
import { IntlProvider } from "react-intl";

import { setInitUrl, userSignIn } from "../../appRedux/actions/Auth";
import {
  onLayoutTypeChange,
  onNavStyleChange,
  setThemeType,
} from "../../appRedux/actions/Setting";

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_TYPE_DARK,
} from "../../constants/ThemeSetting";
import URL from "../../env/environmentVar";


const Page404 = React.lazy(() => {
  return import("../../MyComponents/Page404");
});
const SignIn = React.lazy(() => {
  return import("../SignIn");
});



import MainApp from "./MainApp";
let that;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
    that = this;
  }

  setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove("boxed-layout");
      document.body.classList.remove("framed-layout");
      document.body.classList.add("full-layout");
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove("full-layout");
      document.body.classList.remove("framed-layout");
      document.body.classList.add("boxed-layout");
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove("boxed-layout");
      document.body.classList.remove("full-layout");
      document.body.classList.add("framed-layout");
    }
  };

  setNavStyle = (navStyle) => {
    if (
      navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER
    ) {
      document.body.classList.add("full-scroll");
      document.body.classList.add("horizontal-layout");
    } else {
      document.body.classList.remove("full-scroll");
      document.body.classList.remove("horizontal-layout");
    }
  };

  componentWillMount() {
    var currentKey=localStorage.getItem('tabkey');
    console.log('currentKey in index js of container');
    console.log(currentKey);
    console.log(window.location.pathname)
    
    fetch(`${URL.APIURL}/isAuthenticated`, {
      // mode :'no-cors',
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("res....in is authenticated", res);
        if (res.status === 200) {
          this.props.userSignIn(res.userData);
          global.user = res.userData;
          this.setState({
            isLoading: false,
          });
          if (
            window.location.pathname === "/signIn" &&
            global.user !== "" &&
            global.user !== undefined
          ) {
            this.props.history.push("/profile");
          }
          //  this.props.history.push(window.location.pathname);
        } else if (res.status === 300 && res.message === "Please login") {
          global.user = "";
          this.setState({
            isLoading: false,
          });
          console.log("gfdjgklfdgkldfjgkldf", window.location.pathname);

        
            that.props.history.push("/signIn");
          
        }
      });

   

    if (this.props.initURL === "") {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
    const params = new URLSearchParams(this.props.location.search);

    if (params.has("theme")) {
      this.props.setThemeType(params.get("theme"));
    }
    if (params.has("nav-style")) {
      this.props.onNavStyleChange(params.get("nav-style"));
    }
    if (params.has("layout-type")) {
      this.props.onLayoutTypeChanewProposalnge(params.get("layout-type"));
    }
  }

  render() {
    const {
      match,
      location,
      themeType,
      layoutType,
      navStyle,
      locale,
      authUser,
      initURL,
    } = this.props;
    console.log("this.props.authuserrrrrrrrrrrrrrrrrrrr", authUser);
    const RestrictedRoute = ({ component: Component, authUser, ...rest }) => {
      return this.state.isLoading === true && global.user === undefined ? (
        <Spin style={{ marginLeft: "50%", marginTop: "20%" }} size="large" />
      ) : (
        <Route
          {...rest}
          render={(props) => {
            return that.props.authUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/signIn",
                  state: { from: props.location },
                }}
              />
            );
          }}
        />
      );
    };
    if (themeType === THEME_TYPE_DARK) {
      document.body.classList.add("dark-theme");
    }
    if (location.pathname === "/") {
      return <Redirect to="/signIn" />;
    }
    this.setLayoutType(layoutType);

    this.setNavStyle(navStyle);

    return (
      <LocaleProvider>
        <IntlProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/signIn" component={SignIn} />
           
         
            <RestrictedRoute component={MainApp} />
            <Route component={Page404} />
          </Switch>
      </Suspense>
        </IntlProvider>

        <ToastContainer />
      </LocaleProvider>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { locale, navStyle, themeType, layoutType } = settings;
  const { authUser, initURL } = auth;
  return {
    locale,
    navStyle,
    themeType,
    layoutType,
    authUser,
    initURL,
  };
};
export default connect(mapStateToProps, {
  setInitUrl,
  setThemeType,
  onNavStyleChange,
  onLayoutTypeChange,
  userSignIn,
})(App);
