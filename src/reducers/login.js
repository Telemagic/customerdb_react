const defaultState = {
  isLoggedIn: false,
  username: {
    value: '',
    errors: undefined
  },
  password: {
    value: '',
    errors: undefined
  }};

const loginStatus = (state = defaultState, action) => {
  switch(action.type) {
    case 'LOG_IN':
      return Object.assign({}, state, {isLoggedIn: true});
    case 'LOG_OUT':
      return Object.assign({}, defaultState, {username: {value: state.username.value}, password: {value: state.password.value}});
    case 'SET_USERNAME':
      return Object.assign({}, state, {username: {value: action.username, errors: undefined}});
    case 'SET_USERNAME_ERROR':
      return Object.assign({}, state, {username: {value: state.username.value, errors: action.msg}});
    case 'SET_PASSWORD':
      return Object.assign({}, state, {password: {value: action.password, errors: undefined}});
    case 'SET_PASSWORD_ERROR':
      return Object.assign({}, state, {password: {value: state.password.value, errors: action.msg}});
    default:
      return state;
  }
};

export default loginStatus;