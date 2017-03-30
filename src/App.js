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
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoggedIn: false
    };

    this.renderAppBarRightElement = this.renderAppBarRightElement.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Telemagic Customer Viewer"
            showMenuIconButton={false}
            iconElementRight={this.renderAppBarRightElement()}
          />
          {this.renderContent()}
        </div>
      </MuiThemeProvider>
    );
  }

  renderAppBarRightElement() {
    if (this.state.isLoggedIn) {
      return <FlatButton label="Logout" onTouchTap={this.handleLogout} />
    }
  }

  handleLogout() {
    firebase.auth().signOut().then(() => {
      this.setState({isLoggedIn: false});
    })
  }

  renderContent() {
    if (this.state.isLoggedIn) {
      return <CustomerOverview />
    } else {
      return <Login onLoginSuccess={() => this.setState({isLoggedIn: true})} />
    }
  }
}

export default App;
