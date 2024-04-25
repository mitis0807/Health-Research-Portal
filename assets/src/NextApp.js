import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import './assets/vendors/style';
import './styles/wieldy.less';
import configureStore, { history } from './appRedux/store';
import App from './containers/App/index';
// import App from "./App";


export const store = configureStore();

export default class NextApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount(){
    console.log('in component did mount of next app js')
  
    //localStorage.setItem('tabkey',1)
  }

  render() {
    console.log('in appppppppppppppppppp.jssssssssssssssssss')
    return (

      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </ConnectedRouter>

      </Provider>
    );
  }
}
