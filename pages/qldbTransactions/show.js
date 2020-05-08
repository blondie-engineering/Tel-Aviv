import React, { Component } from 'react';
import { Card, Grid, Button, Message, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Transaction from '../../ethereum/transaction';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';
import { queryHistory, backupInEth, addAmount } from '../../services/qldb';
import factory from '../../ethereum/factory';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const id = props.query.id;
    const history = await queryHistory(id);
    return { history, id };
  }

  state = {
    history: [],
    loading: false,
    errorMessage: '',
    shouldBeDisabled: this.props.history.slice(-1)[0].inEth
  }

  async addHundredDollars() {
    this.setState({loading: true});
    try {
      const id = this.props.id;
      await addAmount(id);
      const history = await queryHistory(id);
      this.setState({ history });
    } catch(err) {
      this.setState({errorMessage: err.message});
    } finally {
      this.setState({loading: false});
    }

  }

  async backupTransaction() {
    this.setState({loading: true});
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createTransaction(this.props.history.slice(-1)[0].amount, this.props.history.slice(-1)[0].company)
        .send({
          from: accounts[0]
        });
      const campaignAddress = await factory.methods.getNewContract().call();
      console.log(campaignAddress);
      await backupInEth(this.props.id, campaignAddress);
      const history = await queryHistory(this.props.id);
      this.setState({ errorMessage: null, history, shouldBeDisabled: history.slice(-1)[0].inEth });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    } finally {
      this.setState({loading: false});
    }
  }

  renderCards() {
    const historyActual = this.state.history.length ? this.state.history : this.props.history;
    const items = historyActual.map(history => {
      return {
        header: `v.${history.version}`,
        description: (
          <div>
            <div> Company: { history.company } </div>
            <div> inEth: { history.inEth ? 'yes' : 'no'} </div>
            <div> amount: { history.amount } $</div>
            {history.inEth ? (
              <Link route={`/campaigns/${history.ethAddress}`}>
                <a>
                  <Icon link name='diamond'/> Click to see Ethereum Contract <Icon link name='diamond' />
                </a>
              </Link>
            ) : null}
          </div>
        ),
        style: { backgroundColor: history.inEth ? 'lightgreen' : 'white', overflowWrap: 'break-word' }
      }
    }

    );
    return <Card.Group items={items} />;
  }


  render() {
    return (
      <Layout>
        <h3>Transaction history Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <Button primary loading={this.state.loading} disabled={this.state.shouldBeDisabled}>
                <div onClick={() => this.backupTransaction()}>
                Backup transaction
                </div>
              </Button>
              <Button secondary loading={this.state.loading} disabled={this.state.shouldBeDisabled}>
                <div onClick={() => this.addHundredDollars()}>
                Add 100 dollars
                </div>
              </Button>
            </Grid.Column>
          </Grid.Row>

        </Grid>
        {this.state.errorMessage && <Message error header="Ooops!" content={this.state.errorMessage} />}
      </Layout>
    );
  }
}

export default CampaignShow;
