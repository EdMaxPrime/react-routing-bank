import React from 'react';
import "./Form.css";

function PurchaseForm(props) {
	return (
        <div className="form-container">
            <h4 className="form-title">{props.title}</h4>
            <form className="form-body" onSubmit={props.handleForm}>
                <div className="form-field">
                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" onChange={props.setDescription} />
                </div>
                <div className="form-field">
                    <label htmlFor="amount">Amount $ </label>
                    <input type="number" id="amount" onChange={props.setAmount} />
                </div>
                <div className="form-field">
                    <input type="submit" value="Add Debit" />
                </div>
            </form>
        </div>
    );
}

export default PurchaseForm;