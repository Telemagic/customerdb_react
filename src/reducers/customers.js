const defaultState = {
  customers: []
};

const customersState = (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_CUSTOMERS':
      return {customers: action.customers};
    default:
      return state;
  }
};

export default customersState;