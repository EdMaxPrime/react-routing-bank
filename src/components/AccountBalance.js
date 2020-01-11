import React, {Component} from 'react';
import "./common.css";

class AccountBalance extends Component {
    render() {
  	    var color;
        if (this.props.accountBalance > 0) {
        	color = "blue";
        } else {
        	color = "red";
        }
	    return (
		    <div className="card">
		      	<h4 className="card-title">Balance</h4>
		      	<div style={{color: color}}>${this.props.accountBalance.toFixed(2)}</div>
		    </div>	  
		);
    }
}

export default AccountBalance;