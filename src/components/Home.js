import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
        <div>
          <h1>Bank of React</h1>

          <Link to="/userProfile">User Profile</Link>
          <br />
          <Link to="/credits">View Credits</Link>
          <br />
          <Link to="/debits">View Debits</Link>

          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
    );
  }
}

export default Home;