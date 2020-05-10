import React, { Component } from 'react';
import { Card, Button, Checkbox } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import {getEthTransactions, getQldbTransactions} from '../redux/actions/statsActions';
import {connect} from 'react-redux';

class CampaignIndex extends Component {

  static async getInitialProps(props) {
    const campaigns = await factory.methods.getDeployedTransactions().call();
    return { campaigns };
  }

  componentDidMount() {
    this.props.ethTransactions(this.props.campaigns.length);
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

const mapStateToProps = state => ({
    counter: state.stats.ethTransactions
});

const mapDispatchToProps = {
    ethTransactions: (transactions) => getEthTransactions(transactions)
};


export default connect(mapStateToProps, mapDispatchToProps)(CampaignIndex);
