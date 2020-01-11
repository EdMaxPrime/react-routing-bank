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
      accountBalance: 14568.27,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      }
    }
    //Bind This
    this.addCredit = this.addCredit.bind(this);
    this.addDebit = this.addDebit.bind(this);
    this.getAccountBalance = this.getAccountBalance.bind(this);
  }

  /**
  * This function is a callback passed to the credit page component.
  * It updates the account balance across all pages by adding the amount.
  * @param amount  the number of dollars to be added to balance 
  */
  addCredit(amount) {
    var user = this.state.currentUser;
    this.setState({
      accountBalance: this.state.accountBalance + amount,
      currentUser: user
    });
  }

  /**
  * This function is a callback passed to the debit page component.
  * It updates the account balance across all pages by adding the amount.
  * @param amount  the number of dollars to be added to balance 
  */
  addDebit(amount) {
    var user = this.state.currentUser;
    this.setState({
      accountBalance: this.state.accountBalance - amount,
      currentUser: user
    });
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
    const CreditComponent = () => (<CreditPage updateAccountBalance={this.addCredit} getAccountBalance={this.getAccountBalance} />);
    const DebitComponent = () => (<DebitPage updateAccountBalance={this.addDebit} getAccountBalance={this.getAccountBalance} />);

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