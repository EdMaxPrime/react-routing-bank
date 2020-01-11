import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import CreditPage from './components/CreditPage';
import DebitPage from './components/DebitPage';

class App extends Component {

  constructor() {
    super();

    this.state = {
      accountBalance: 0,
      creditsNotAdded: [],
      debitsNotAdded:  [],
      credits: [],
      debits:  [],
      isMounted: false,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      }
    }
    //Bind This
    this.addCredit = this.addCredit.bind(this);
    this.addDebit = this.addDebit.bind(this);
    this.getCredits = this.getCredits.bind(this);
    this.getDebits  = this.getDebits.bind(this);
    this.getAccountBalance = this.getAccountBalance.bind(this);
    /* Fetch credit data from the API */
    /* Make an API call to get the initial list of purchases. */
    fetch("https://moj-api.herokuapp.com/credits")
    .then((response) => (
      response.json()))
    .then((json) => {
      /* After the API gives us a list of purchases, we need to add each one
      * to this component, but store them in a temp list */
      if(this.state.isMounted == false) {
        this.state.creditsNotAdded = json;
      } 
      else {
        for (var i = 0; i < json.length; i++) {
          this.addCredit(json[i]);
        }
      }
    });
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
    for (let i = 0; i < this.state.creditsNotAdded.length; i++) {
      this.addCredit(this.state.creditsNotAdded[i]);
    }
    //move from temp array to actual list of table rows
    for (let i = 0; i < this.state.debitsNotAdded.length; i++) {
      this.addDebit(this.state.debitsNotAdded[i]);
    }
    this.setState({
      creditsNotAdded: [],
      debitsNotAdded: [],
      isMounted: true
    });
  }

  /**
  * This function is a callback passed to the credit page component.
  * It updates the account balance across all pages by adding the amount.
  * @param purchaseObject  an object with these keys:
  *                        id, description, amount, date
  */
  addCredit(purchaseObject) {
    var user = this.state.currentUser;
    /*Make a copy of the list of credit purchases, so that the state 
    * isn't modified directly. That could mess with the lifecycle. */
    var newList = this.state.credits.slice(0, this.state.credits.length);
    /* Add new purchase to the list */
    newList.push(purchaseObject);
    /* Update the state on this component, which adds an extra row
    * to the table. */
    this.setState({
      credits: newList,
      accountBalance: this.state.accountBalance + purchaseObject.amount,
      currentUser: user
    });
  }

  /**
  * This function is a callback passed to the debit page component.
  * It updates the account balance across all pages by adding the amount.
  * @param purchaseObject  an object with these keys:
  *                        id, description, amount, date
  */
  addDebit(purchaseObject) {
    var user = this.state.currentUser;
    /*Make a copy of the list of debit purchases, so that the state 
    * isn't modified directly. That could mess with the lifecycle. */
    var newList = this.state.debits.slice(0, this.state.debits.length);
    /* Add new purchase to the list */
    newList.push(purchaseObject);
    /* Update the state on this component, which adds an extra row
    * to the table. */
    this.setState({
      debits: newList,
      accountBalance: this.state.accountBalance - purchaseObject.amount,
      currentUser: user
    });
  }

  /**
  * Works as a reference to the list of credits for the credit page */
  getCredits() {
    return this.state.credits;
  }

  /**
  * Works as a reference to the list of debits for the debit page */
  getDebits() {
    return this.state.debits;
  }

  /**
  * This method is a callback passed to all the pages. This is the only
  * way to get the account balance and see it update. Passing just a
  * variable won't let the pages see changes to the number. This is solved
  * by using a function like this that returns a reference to the number.
  * @return  the number of dollars in the account 
  */
  getAccountBalance () {
    return this.state.accountBalance;
  }

  render() {

    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const CreditComponent = () => (<CreditPage updateAccountBalance={this.addCredit} getAccountBalance={this.getAccountBalance} getData={this.getCredits} />);
    const DebitComponent  = () => (<DebitPage  updateAccountBalance={this.addDebit}  getAccountBalance={this.getAccountBalance} getData={this.getDebits}  />);

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/credits" render={CreditComponent}/>
            <Route exact path="/debits" render={DebitComponent}/>
          </div>
        </Router>
    );
  }

}

export default App;