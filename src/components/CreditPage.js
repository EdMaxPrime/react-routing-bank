import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import PurchaseForm from './PurchaseForm';
import Table from './Table';
import {Link} from 'react-router-dom';

class CreditPage extends Component {
    constructor(props) {
        super(props);
        /* Initialize state to an empty list of purchases */
        this.state = {
            creditsNotAdded: [],
            purchases: [],
            mounted: false
        }
        /* Make an API call to get the initial list of purchases. 
        * Hardcoded for now. This code should be in the callback */
        var data = [{id: "qwbdh", description: "First", amount: 47, date: "11-01-2019"}];
        /* After the API gives us a list of purchases, we need to add each one
        * to this component, but store them in a temp list */
        if(this.state.mounted == false) {
            this.state.creditsNotAdded = data;
        } 
        else {
            for (var i = 0; i < data.length; i++) {
                this.addCredit(data[i]);
            }
        }
    }

    /** 
    * This is a lifecycle method from React. Here, we move data from
    * the API into the proper state object. This is just in case the
    * API returns data before this component is mounted. */
    componentDidMount() {
        //move from temp array to actual list of table rows
        for (var i = 0; i < this.state.creditsNotAdded.length; i++) {
            this.addCredit(this.state.creditsNotAdded[i]);
        }
        this.setState({
            creditsNotAdded: [],
            mounted: true
        });
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

    /**
    * This method is an even listener for the form. It will take data
    * from the inputs about the new credit and then call the addCredit()
    * method to add it to the app. 
    */
    handleNewCredit = (event) => {
        var now = new Date();
        this.addCredit({
            id: now.getTime(),
            description: this.state.newDescription,
            amount: this.state.newAmount,
            date: now.toISOString()
        });
        event.preventDefault();
    }

    setDescription = (event) => {
        this.setState({newDescription: event.target.value});
    }

    setAmount = (event) => {
        this.setState({newAmount: parseInt(event.target.value)});
    }

    render() { 
        return (
            <div>
            <img src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png" alt="bank"/>
            <h1>Bank of React: Credit</h1>
            <Link to="/">Home</Link>
          
            <AccountBalance accountBalance={this.props.getAccountBalance()}/>
            
            <PurchaseForm title="New Credit" setDescription={this.setDescription} setAmount={this.setAmount} handleForm={this.handleNewCredit}></PurchaseForm>

            <h3>Credit Purchases</h3>
            <Table rows={this.state.purchases} />
            </div>
        );
    }
}

export default CreditPage;