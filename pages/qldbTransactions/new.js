import React, { Component } from 'react';
import { Form, Button, Input, Message, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import { createTransaction } from '../../services/qldb';
import { insertStatistic } from '../../services/dynamo';

class TransactionNew extends Component {
  state = {
    amountValue: null,
    companyName: null,
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const t0 = new Date().getTime();
      await createTransaction(Number(this.state.amountValue), this.state.companyName);
      const t1 = new Date().getTime();
      await insertStatistic('qldb', 'put', t1 - t0);
      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Transaction inside QLDB</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Amount</label>
            <Input
              type="number"
              label="dollars"
              labelPosition="right"
              value={this.state.amountValue}
              onChange={event =>
                this.setState({ amountValue: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Company</label>
            <Input
              label="name"
              labelPosition="right"
              value={this.state.companyName}
              onChange={event =>
                this.setState({ companyName: event.target.value })}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
        {this.state.errorMessage && <Message error header="Ooops!" content={this.state.errorMessage} />}

      </Layout>
    );
  }
}

export default TransactionNew;
