import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
      if (this.props.accountBalance > 0) {
	  return (
		  <div style={{color:"blue"}}>
		  Balance: {this.props.accountBalance}
		  </div>	  
		  );
      }
      else {
	  return (
		  <div style={{color:"red"}}>
		  Balance: {this.props.accountBalance}
		  </div>	  
		  );
      }
  }
}

export default AccountBalance;