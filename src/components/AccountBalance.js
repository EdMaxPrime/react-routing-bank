import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
      if (this.props.accountBalance > 0) {
	      return (
		      <div style={{color:"blue"}}>
		        Balance: ${this.props.accountBalance.toFixed(2)}
		      </div>	  
		    );
      }
      else {
	      return (
		      <div style={{color:"red"}}>
		        Balance: ${this.props.accountBalance.toFixed(2)}
		      </div>	  
		    );
      }
  }
}

export default AccountBalance;