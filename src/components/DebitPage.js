import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import PurchaseForm from './PurchaseForm';
import Table from './Table';
import {Link} from 'react-router-dom';

class DebitPage extends Component {
    constructor(props) {
        super(props);
        /* Initialize state to an empty list of purchases */
        this.state = {
            debitsNotAdded: [],
            purchases: [],
            mounted: false
        }
        /* Make an API call to get the initial list of purchases. */
        fetch("https://moj-api.herokuapp.com/debits")
        .then((response) => (
            response.json()))
        .then((json) => {
            /* After the API gives us a list of purchases, we need to add each one
            * to this component, but store them in a temp list */
            if(this.state.mounted == false) {
                this.state.debitsNotAdded = json;
            } 
            else {
                for (var i = 0; i < json.length; i++) {
                    this.addDebit(json[i]);
                }
            }
        });
    }

    /** 
    * This is a lifecycle method from React. Here, we move data from
    * the API into the proper state object. This is just in case the
    * API returns data before this component is mounted. */
    componentDidMount() {
        //move from temp array to actual list of table rows
        for (var i = 0; i < this.state.debitsNotAdded.length; i++) {
            this.addDebit(this.state.debitsNotAdded[i]);
        }
        this.setState({
            debitsNotAdded: [],
            mounted: true
        });
    }
    /**
    * Purchase Object should have these keys: id, description, amount, date 
    */
    addDebit(purchaseObject) {
        /*Make a copy of the list of debit purchases, so that the state 
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
    * from the inputs about the new debit and then call the addDedit()
    * method to add it to the app. 
    */
    handleNewDebit = (event) => {
        var now = new Date();
        this.addDebit({
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
            <h1>Bank of React: Debit</h1>
            <Link to="/">Home</Link>
          
            <AccountBalance accountBalance={this.props.getAccountBalance()}/>
            
            <PurchaseForm title="New Debit" setDescription={this.setDescription} setAmount={this.setAmount} handleForm={this.handleNewDebit}></PurchaseForm>

            <h3>Debit Purchases</h3>
            <Table rows={this.state.purchases} />
            </div>
        );
    }
}

export default DebitPage;