import React from "react";
import "./Table.css";

function Table(props) {
	var rows = props.rows.map( (e) => {
        return (<tr key={e.id}><td>{e.description}</td> <td>${e.amount}</td> <td>{e.date}</td></tr>)
    });
	return (
		<table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
	);
}


export default Table;