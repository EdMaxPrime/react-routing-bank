import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class CreditPage extends Component {
  constructor(props) {
    super(props);
    /* Initialize state to an empty list of purchases */
    this.state = {
      purchases: []
    }
    /* Make an API call to get the initial list of purchases. 
    * Hardcoded for now. This code should be in the callback */
    var data = [{id: "qwbdh", description: "First", amount: 47, date: "11-01-2019"}];
    /* After the API gives us a list of purchases, we need to add each one
    * to this component */
    for(var i = 0; i < data.length; i++) {
      this.addCredit(data[i]);
    }
  }
  /**
  * Purchase Object should have these keys: id, description, amount, date 
  */
  addCredit(purchaseObject) {
    /*Make a copy of the list of credit purchases, so that the state 
    * isn't modified directly. That could mess with the lifecycle. */
    var newList = this.state.purchases.slice(0, this.state.purchases.length);
    /* Add new purchase to the list */
    newList.push(purchaseObject);
    /* Update the state on this component, which adds an extra row
    * to the table. */
    this.setState({
      purchases: newList
    });
    /* Call the parent's callback function, which was provided to use
    * as a prop here. The App container will update the account balance
    * somehow. We tell the parent to do this so that the change is reflected
    * on all pages and not just this one. */
    this.props.updateAccountBalance(purchaseObject.amount);
  }
  render() { 
    return (
        <div>
          <img src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png" alt="bank"/>
          <h1>Bank of React</h1>
          <Link to="/">Home</Link>

          <AccountBalance accountBalance={this.props.getAccountBalance()}/>

          <h3>Credit Purchases</h3>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {}
            </tbody>
          </table>
        </div>
    );
  }
}

export default CreditPage;