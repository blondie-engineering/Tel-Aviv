import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Transaction from '../../ethereum/transaction';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Transaction(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      amountValue: summary[0],
      manager: summary[1],
      company: summary[2]
    };
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


          </Grid.Row>

        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
