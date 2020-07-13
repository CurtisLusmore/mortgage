import React from 'react';
import { Form, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import RepaymentsTable from './RepaymentsTable';
import repaymentSchedule from './RepaymentSchedule';
import './App.css';

class FixedRepayment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      principal: '',
      interest: '',
      repayment: '',
    };

    this.handleChangePrincipal = this.handleChangePrincipal.bind(this);
    this.handleChangeInterest = this.handleChangeInterest.bind(this);
    this.handleChangeRepayment = this.handleChangeRepayment.bind(this);
  }

  handleChangePrincipal(event) {
    const principal = event.target.value;
    this.setState({ principal });
  }

  handleChangeInterest(event) {
    const interest = event.target.value;
    this.setState({ interest });
  }

  handleChangeRepayment(event) {
    const repayment = event.target.value;
    this.setState({ repayment });
  }

  render() {
    const { principal, interest, repayment } = this.state;
    const rows = repaymentSchedule(principal, interest, repayment);

    const number = new Intl.NumberFormat('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return <>
      <Form>
        <Row>
          <Col>
            <Form.Label>Principal Amount</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Principal Amount"
                type="number"
                placeholder="500,000"
                value={principal}
                onChange={this.handleChangePrincipal} />
              <InputGroup.Append>
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col>
            <Form.Label>Interest Rate</Form.Label>
            <InputGroup>
              <FormControl
                aria-label="Interest Rate"
                type="number"
                placeholder="3.00"
                value={interest}
                onChange={this.handleChangeInterest} />
              <InputGroup.Append>
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col>
            <Form.Label>Monthly Repayment</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Monthly Repayment"
                type="number"
                placeholder="2,000"
                value={repayment}
                onChange={this.handleChangeRepayment} />
              <InputGroup.Append>
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Total Repayments</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Total Repayments"
                value={number.format(rows.reduce((total, [, , , repayment]) => total + repayment, 0.00))}
                disabled />
            </InputGroup>
          </Col>
          <Col>
            <Form.Label>Total Interest</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Total Interest"
                value={number.format(rows.reduce((total, [, , interest]) => total + interest, 0.00))}
                disabled />
            </InputGroup>
          </Col>
          <Col>
            <Form.Label>Term Length</Form.Label>
            <InputGroup>
              <FormControl
                aria-label="Term Length"
                value={Math.floor((rows.length) / 12)}
                disabled />
              <InputGroup.Append>
                <InputGroup.Text>y</InputGroup.Text>
              </InputGroup.Append>
              <FormControl
                aria-label="Term Length"
                value={(rows.length) % 12}
                disabled />
              <InputGroup.Append>
                <InputGroup.Text>m</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </Form>
      <RepaymentsTable rows={rows} />
    </>;
  }
}

export default FixedRepayment;
