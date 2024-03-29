import React, { Component } from 'react';
import { Form, Button, Input, Message, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import { insertStatistic } from '../../services/dynamo';

class CampaignNew extends Component {
  state = {
    amountValue: '',
    companyName: null,
    errorMessage: '',
    loading: false,
    firstClick: null,
    metamaskTime: null
  };

  clickHandler = (event) => {
    if(this.state.firstClick) {
      const difference = new Date().getTime() - this.state.firstClick;
      console.log(difference);

      this.setState({ metamaskTime: difference, firstClick: null});
    }
  }

  async componentDidMount() {
    document.addEventListener('mousedown', this.clickHandler);
  }

  onSubmit = async event => {
    this.setState({ firstClick: new Date().getTime()});
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      const t0 = new Date().getTime();
      await factory.methods
        .createTransaction(100, this.state.companyName)
        .send({
          from: accounts[0]
        });
      const t1 = new Date().getTime();
      await insertStatistic('eth', 'put', t1 - t0);
      await insertStatistic('eth', 'metamask', this.state.metamaskTime);
      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Amount</label>
            <Input
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
      </Layout>
    );
  }
}

export default CampaignNew;
