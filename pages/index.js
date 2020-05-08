import React, { Component } from 'react';
import { Card, Button, Checkbox } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {

  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedTransactions().call();

    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Transaction</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Transaction"
                icon="add circle"
                primary
              />
            </a>
          </Link>
        </div>
        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;
