import React, { Component } from 'react';
import './App.css';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import firebase from 'firebase';

import Login from './Login';
import CustomerOverview from './CustomerOverview';

// Needed for onTouchTap, see http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Initialize the Firebase SDK
firebase.initializeApp({
  apiKey: "AIzaSyBjoHF2tKDUEXDUOh3wRI-54ilpgRl_JnI",
  authDomain: "customerdb-9b7c3.firebaseapp.com",
  databaseURL: "https://customerdb-9b7c3.firebaseio.com",
  storageBucket: "customerdb-9b7c3.appspot.com",
  messagingSenderId: "1098474460056"
});

class App extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  constructor(props, context) {
    super(props, context);

    this.renderAppBarRightElement = this.renderAppBarRightElement.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  render() {
    const { store } = this.context;
    const state = store.getState();

    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Telemagic Customer Viewer"
            showMenuIconButton={false}
            iconElementRight={this.renderAppBarRightElement(state)}
          />
          {this.renderContent(state)}
        </div>
      </MuiThemeProvider>
    );
  }

  renderAppBarRightElement(state) {
    if (state.loginStatus.isLoggedIn) {
      return <FlatButton label="Logout" onTouchTap={this.handleLogout} />
    }
  }

  handleLogout() {
    const { store } = this.context;
    firebase.auth().signOut().then(() => {
      store.dispatch({type: 'LOG_OUT'});
    });
  }

  renderContent(state) {
    if (state.loginStatus.isLoggedIn) {
      return <CustomerOverview />
    } else {
      return <Login />
    }
  }
}

App.contextTypes = {
  store: React.PropTypes.object
};
export default App;
