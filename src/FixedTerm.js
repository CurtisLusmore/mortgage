import React from 'react';
import { Form, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import RepaymentsTable from './RepaymentsTable';
import repaymentSchedule from './RepaymentSchedule';
import './App.css';

class FixedTerm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      principal: '',
      interest: '',
      years: 30,
      months: 0,
    };

    this.handleChangePrincipal = this.handleChangePrincipal.bind(this);
    this.handleChangeInterest = this.handleChangeInterest.bind(this);
    this.handleChangeYears = this.handleChangeYears.bind(this);
    this.handleChangeMonths = this.handleChangeMonths.bind(this);
  }

  handleChangePrincipal(event) {
    const principal = event.target.value;
    this.setState({ principal });
  }

  handleChangeInterest(event) {
    const interest = event.target.value;
    this.setState({ interest });
  }

  handleChangeYears(event) {
    const years = event.target.value;
    this.setState({ years });
  }

  handleChangeMonths(event) {
    const months = event.target.value;
    this.setState({ months });
  }

  calculateRepayment(principal, interest, years, months) {
    months += years * 12;
    interest = interest / 100.0 / 12;
    const repayment = principal * (interest * Math.pow(1+interest, months)) / (Math.pow(1+interest, months)-1);
    return +repayment.toFixed(2) + 0.01;
  }

  render() {
    const { principal, interest, years, months } = this.state;
    const repayment = this.calculateRepayment(principal, interest, years, months);
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
            <Form.Label>Term Length</Form.Label>
            <InputGroup>
              <FormControl
                aria-label="Term Years"
                type="number"
                placeholder="30"
                value={years}
                onChange={this.handleChangeYears} />
              <InputGroup.Append>
                <InputGroup.Text>y</InputGroup.Text>
              </InputGroup.Append>
              <FormControl
                aria-label="Term Months"
                type="number"
                placeholder="0"
                value={months}
                onChange={this.handleChangeMonths} />
              <InputGroup.Append>
                <InputGroup.Text>m</InputGroup.Text>
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
            <Form.Label>Monthly Repayment</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Monthly Repayment"
                value={number.format(repayment)}
                disabled />
            </InputGroup>
          </Col>
        </Row>
      </Form>
      <RepaymentsTable rows={rows} />
    </>;
  }
}

export default FixedTerm;
