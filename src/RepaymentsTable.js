import React from 'react';
import { Table } from 'react-bootstrap';

function RepaymentsTable(props) {
  const { rows } = props;

  const currency = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  });

  return rows.length === 0
    ? <div></div>
    : <Table striped responsive>
        <thead>
          <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Repayment</th>
            <th>Closing</th>
          </tr>
        </thead>
        <tbody>{
          rows.map(([month, principal, interest, repayment, closing]) =>
            <tr key={month}>
              <td>{Math.floor(month / 12)}</td>
              <td>{month % 12}</td>
              <td>{currency.format(principal)}</td>
              <td>{currency.format(interest)}</td>
              <td>{currency.format(repayment)}</td>
              <td>{currency.format(closing)}</td>
            </tr>)
        }</tbody>
      </Table>;
}

export default RepaymentsTable;
