import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import firebase from 'firebase';

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: {
        value: '',
        errors: undefined
      },
      password: {
        value: '',
        errors: undefined
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.updateErrorMessage = this.updateErrorMessage.bind(this);
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className="valign">
              <i className="material-icons md-36">perm_identity</i>
              <TextField floatingLabelText="Username"
                         value={this.state.username.value}
                         onChange={this.handleUsernameChange}
                         errorText={this.state.username.errors} />
            </div>
          </div>
          <div>
            <div className="valign">
              <i className="material-icons md-36">lock_outline</i>
              <TextField floatingLabelText="Password"
                         type="password"
                         value={this.state.password.value}
                         onChange={this.handlePasswordChange}
                         errorText={this.state.password.errors} />
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
    this.setState({
      username: {
        value: newValue
      }
    });
  }

  handlePasswordChange(_, newValue) {
    this.setState({
      password: {
        value: newValue
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault(); // Prevent refreshing of page

    firebase.auth().signInWithEmailAndPassword(this.state.username.value, this.state.password.value)
      .then(() => {
        if (this.props.onLoginSuccess) {
          this.props.onLoginSuccess();
        }
      })
      .catch(error => {
        this.updateErrorMessage(error.code);
        if (this.props.onLoginError) {
          this.props.onLoginError(error);
        }
      });
  }

  updateErrorMessage(errorCode) {
    if (errorCode === 'auth/user-not-found') {
      this.setState({
        username: Object.assign({}, this.state.username, { errors: 'User not found' })
      });
    } else if (errorCode === 'auth/invalid-email') {
      this.setState({
        username: Object.assign({}, this.state.username, { errors: 'Invalid email' })
      });
    } else if (errorCode === 'auth/wrong-password') {
      this.setState({
        password: Object.assign({}, this.state.password, { errors: 'Wrong password' })
      });
    }
  }
}

export default Login;
