import React from 'react';
import { ToggleButtonGroup, ToggleButton, Container, Form } from 'react-bootstrap';
import './App.css';

import FixedRepayment from './FixedRepayment';
import FixedTerm from './FixedTerm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mode: '' };

    this.handleChangeMode = this.handleChangeMode.bind(this);
  }

  renderDetails(mode) {
    switch (mode) {
      case 'fixed-term':
        return <FixedTerm />;
      case 'fixed-repayment':
        return <FixedRepayment />;
      default:
        return <></>;
    }
  }

  handleChangeMode(mode) {
    this.setState({ mode });
  }

  render() {
    const { mode } = this.state;
    return <div class="App">
      <Container>
        <h1><span role="img" aria-label="Home">🏡</span> Mortgage Calculator</h1>
        <Form>
          <ToggleButtonGroup type="radio" name="mode" onChange={this.handleChangeMode}>
            <ToggleButton value="fixed-term">Fixed Term</ToggleButton>
            <ToggleButton value="fixed-repayment">Fixed Repayment</ToggleButton>
          </ToggleButtonGroup>
        </Form>
        {this.renderDetails(mode)}
      </Container>
    </div>;
  }
}

export default App;
