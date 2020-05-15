import React, { Component } from 'react';
import { Card, Grid, Button, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Transaction from '../../ethereum/transaction';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';
import { insertStatistic } from '../../services/dynamo';

class CampaignShow extends Component {

  state = {
    loading: false
  }

  static async getInitialProps(props) {
    const campaign = Transaction(props.query.address);
    const t0 = new Date().getTime();
    const summary = await campaign.methods.getSummary().call();
    const t1 = new Date().getTime();
    await insertStatistic('eth', 'getSpecific', t1 - t0);

    return {
      address: props.query.address,
      amountValue: summary[0],
      manager: summary[1],
      company: summary[2]
    };
  }

  async modify() {
    const accounts = await web3.eth.getAccounts();
    const campaign = Transaction(this.props.address);
    this.setState({loading: true});
    const t0 = new Date().getTime();
    const result = await campaign.methods.addAmount('100').send({
      from: accounts[0]
    });
    console.log(result);
    const t1 = new Date().getTime();
    await insertStatistic('eth', 'modification', t1 - t0);
    this.setState({loading: false});
  }

  renderCards() {
    const {
      manager,
      company,
      amountValue
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: company,
        meta: 'Transaction company',
        description:
          'The company that has been backed in Eth',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: amountValue,
        meta: 'Amount value',
        description:
          'Amount value of transction'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Button secondary loading={this.state.loading}>
              <div onClick={() => this.modify()}>
                Add 100 dollars
              </div>
            </Button>
          </Grid.Row>

        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
