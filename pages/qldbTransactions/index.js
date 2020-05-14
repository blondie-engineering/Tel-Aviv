import React, { Component } from 'react';
import { Card, Button, Message, Icon } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import { Router, Link } from '../../routes';
import { getTransactions, deleteTransactions } from '../../services/qldb';
import {connect} from 'react-redux';
import { getQldbTransactions} from '../../redux/actions/statsActions';

class CampaignIndex extends Component {

  state = {
    transactions: [],
    loading: false,
    errorMessage: null
  }

  async componentDidMount() {
    try {
      const transactions = await getTransactions();
      this.setState({transactions});
      this.props.qldbTransactions(transactions.length)
    } catch(err) {
      console.log(err);
      this.setState({errorMessage: err.message})
    }

  }

  async delete() {
    this.setState({loading: true});
    try {
      await deleteTransactions();
      Router.pushRoute('/');
    } catch(err) {
      this.setState({errorMessage: err.message});
    } finally {
      this.setState({loading: false});
    }

  }

  renderTransactions() {
    if(!this.state.transactions.length) {
      return null;
    }
    const items = this.state.transactions.filter(transaction => transaction.company).map(transaction => {
      return {
        key: transaction.id,
        header: transaction.company,
        description: (
          <div>
            <Link route={`/qldbTransactions/${transaction.id}`}>
              <a>View Transaction History</a>
            </Link>
            <div>amount: { transaction.amount } </div>
            <div>inEth: { transaction.inEth ? 'yes' : 'no'} </div>
          </div>
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
        <Link route="/qldbTransactions/new">
          <a>
            <Button
              loading={this.state.loading}
              floated="right"
              content="Create Transaction"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        <div onClick={() => this.delete()}>
          <Button
            loading={this.state.loading}
            floated="right"
            content="Delete Transactions"
            icon="minus circle"
            secondary
        />
         </div>


      </div>
        <div>
          <h3>Open transactions</h3>
          {this.state.transactions ?
            this.renderTransactions() : null
          }
        </div>
        {this.state.errorMessage && <Message error header="Ooops!" content={this.state.errorMessage} />}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
    counter: state.stats.qldbTransactions
});

const mapDispatchToProps = {
    qldbTransactions: (transactions) => getQldbTransactions(transactions)
};


export default connect(mapStateToProps, mapDispatchToProps)(CampaignIndex);
