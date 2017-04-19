import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import firebase from 'firebase';

class Login extends Component {
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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.updateErrorMessage = this.updateErrorMessage.bind(this);
  }

  render() {
    const { store } = this.context;
    const state = store.getState();

    return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className="valign">
              <i className="material-icons md-36">perm_identity</i>
              <TextField floatingLabelText="Username"
                         value={state.loginStatus.username.value}
                         onChange={this.handleUsernameChange}
                         errorText={state.loginStatus.username.errors} />
            </div>
          </div>
          <div>
            <div className="valign">
              <i className="material-icons md-36">lock_outline</i>
              <TextField floatingLabelText="Password"
                         type="password"
                         value={state.loginStatus.password.value}
                         onChange={this.handlePasswordChange}
                         errorText={state.loginStatus.password.errors} />
            </div>
          </div><br />

          <RaisedButton
            type="submit"
            label="Login"
            labelPosition="before"
            primary={true}
            icon={<i className="material-icons md-light">send</i>}
            onTouchTap={this.handleSubmit}
          />
        </form>
    );
  }

  handleUsernameChange(_, newValue) {
    const { store } = this.context;
    store.dispatch({
      type: 'SET_USERNAME',
      username: newValue
    });
  }

  handlePasswordChange(_, newValue) {
    const { store } = this.context;
    store.dispatch({
      type: 'SET_PASSWORD',
      password: newValue
    });
  }

  handleSubmit(event) {
    event.preventDefault(); // Prevent refreshing of page
    const { store } = this.context;
    const state = store.getState();
    firebase.auth().signInWithEmailAndPassword(
        state.loginStatus.username.value,
        state.loginStatus.password.value)
      .then(() => store.dispatch({type: 'LOG_IN'}))
      .catch(error => this.updateErrorMessage(error.code));
  }

  updateErrorMessage(errorCode) {
    const { store } = this.context;
    if (errorCode === 'auth/user-not-found') {
      store.dispatch({
        type: 'SET_USERNAME_ERROR',
        msg: 'User not found'
      });
    } else if (errorCode === 'auth/invalid-email') {
      store.dispatch({
        type: 'SET_USERNAME_ERROR',
        msg: 'Invalid email'
      });
    } else if (errorCode === 'auth/wrong-password') {
      store.dispatch({
        type: 'SET_PASSWORD_ERROR',
        msg: 'Wrong password'
      });
    }
  }
}

Login.contextTypes = {
  store: React.PropTypes.object
};
export default Login;
