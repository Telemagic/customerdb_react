import React, {Component} from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import firebase from 'firebase';

class CustomerOverview extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleCustomersUpdated = this.handleCustomersUpdated.bind(this);
    CustomerOverview.renderCustomerRow = CustomerOverview.renderCustomerRow.bind(this);
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );

    var ref = firebase.database().ref('customers');
    ref.once('value').then(this.handleCustomersUpdated);
    ref.on('value').then(this.handleCustomersUpdated);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleCustomersUpdated(snapshot) {
    const { store } = this.context;
    store.dispatch({
      type: 'SET_CUSTOMERS',
      customers: snapshot.val()
    });
  }

  render() {
    const { store } = this.context;
    const state = store.getState();
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Site</TableHeaderColumn>
              <TableHeaderColumn>Customer</TableHeaderColumn>
              <TableHeaderColumn>Licenses</TableHeaderColumn>
              <TableHeaderColumn>Contacts</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.customersState.customers.map(CustomerOverview.renderCustomerRow)}
          </TableBody>
        </Table>
      </div>
    );
  }

  static renderCustomerRow(customerData) {
    return (
      <TableRow key={customerData.siteNick}>
        <TableRowColumn>{customerData.siteNick}</TableRowColumn>
        <TableRowColumn>{customerData.customer}</TableRowColumn>
        <TableRowColumn>{customerData.license.numberOfAgents}</TableRowColumn>
        <TableRowColumn>{CustomerOverview.renderContacts(customerData.contacts)}</TableRowColumn>
      </TableRow>
    );
  }

  static renderContacts(contactList = []) {
    return contactList.map(contact => contact.email).join(', ')
  }
}

CustomerOverview.contextTypes = {
  store: React.PropTypes.object
};
export default CustomerOverview;
