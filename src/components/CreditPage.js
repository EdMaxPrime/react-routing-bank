import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import PurchaseForm from './PurchaseForm';
import Table from './Table';
import {Link} from 'react-router-dom';

class CreditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newDescription: "",
            newAmount: ""
        };
    }

    /**
    * This method is an even listener for the form. It will take data
    * from the inputs about the new debit, convert it into an object,
    * then notify the parent/container/app to update the data and the
    * account balance. 
    */
    handleNewCredit = (event) => {
        var now = new Date();
        this.props.updateAccountBalance({
            id: now.getTime(),
            description: this.state.newDescription,
            amount: this.state.newAmount,
            date: now.toISOString()
        });
        event.preventDefault();
    }

    /**
    * Captures events from the text field for the new purchase's
    * description. Saves into the state until it is needed. */
    setDescription = (event) => {
        this.setState({newDescription: event.target.value});
    }

    /**
    * Captures events from the text field for the new purchase's
    * amount. Saves into the state until it is needed. */
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
            <Table rows={this.props.getData()} />
            </div>
        );
    }
}

export default CreditPage;