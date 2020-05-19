import React, { Component } from 'react';
import { Card, Button, Message, Table, Header, Image, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { getStatistics } from '../../services/dynamo';

class TableIndex extends Component {

  state = {
    qldbPutsAmount: null,
    ethPutsAmount: null,
    qldbGetsAmount: null,
    ethGetsAmount: null,
    qldbGetsSpecificAmount: null,
    ethGetsSpecificAmount: null,
    qldbPutsTime: null,
    ethPutsTime: null,
    qldbGetsTime: null,
    ethGetsTime: null,
    qldbGetsSpecificTime: null,
    ethGetsSpecificTime: null,
    qldbRevisionTime: null,
    qldbRevisionAmount: null,
    qldbModificationTime: null,
    qldbModificationAmount: null,
    ethModificationAmount: null,
    ethModificationTime: null,
    metamaskAmount: null,
    metamaskTime: null
  }

  async componentDidMount() {
      const statistics = await getStatistics();

      const qldbPuts = statistics.Items.filter(stat => stat.storage.S === 'qldb' && stat.operation_type.S === 'put');
      const qldbGets = statistics.Items.filter(stat => stat.storage.S === 'qldb' && stat.operation_type.S === 'get');
      const qldbGetsSpecific = statistics.Items.filter(stat => stat.storage.S === 'qldb' && stat.operation_type.S === 'getSpecific');
      const qldbRevision = statistics.Items.filter(stat => stat.storage.S === 'qldb' && stat.operation_type.S === 'revision');
      const qldbMofication = statistics.Items.filter(stat => stat.storage.S === 'qldb' && stat.operation_type.S === 'modification');
      const qldbPutsAmount = qldbPuts.length;
      const qldbPutsTime = qldbPuts.map(stat => parseInt(stat.operation_time.N)).reduce((a, b) => a + b, 0) / qldbPutsAmount;
      const qldbGetsAmount = qldbGets.length;
      const qldbGetsTime = qldbGets.map(stat => parseInt(stat.operation_time.N)).reduce((a, b) => a + b, 0) / qldbGetsAmount;
      const qldbGetsSpecificAmount = qldbGetsSpecific.length;
      const qldbGetsSpecificTime = qldbGetsSpecific.map(stat => parseInt(stat.operation_time.N)).reduce((a, b) => a + b, 0) / qldbGetsSpecificAmount;
      const qldbRevisionAmount = qldbRevision.length;
      const qldbRevisionTime = qldbRevision.map(stat => parseInt(stat.operation_time.N)).reduce((a, b) => a + b, 0) / qldbRevisionAmount;
      const qldbModificationAmount = qldbMofication.length;
      const qldbModificationTime = qldbMofication.map(stat => parseInt(stat.operation_time.N)).reduce((a, b) => a + b, 0) / qldbModificationAmount;


      const ethPuts = statistics.Items.filter(stat => stat.storage.S === 'eth' && stat.operation_type.S === 'put');
      const ethGets = statistics.Items.filter(stat => stat.storage.S === 'eth' && stat.operation_type.S === 'get');
      const ethGetsSpecific = statistics.Items.filter(stat => stat.storage.S === 'eth' && stat.operation_type.S === 'getSpecific');
      const ethModification = statistics.Items.filter(stat => stat.storage.S === 'eth' && stat.operation_type.S === 'modification');
      const metamask = statistics.Items.filter(stat => stat.storage.S === 'eth' && stat.operation_type.S === 'metamask');

      const ethPutsAmount = ethPuts.length;
      const ethPutsTime = ethPuts.map(stat => parseInt(stat.operation_time.N)).reduce((a, b) => a + b, 0) / ethPutsAmount;
      const ethGetsAmount = ethGets.length;
      const ethGetsTime = ethGets.map(stat => parseInt(stat.operation_time.N)).reduce((a, b) => a + b, 0) / ethGetsAmount;
      const ethGetsSpecificAmount = ethGetsSpecific.length;
      const ethGetsSpecificTime = ethGetsSpecific.map(stat => parseInt(stat.operation_time.N)).reduce((a, b) => a + b, 0) / ethGetsSpecificAmount;
      const ethModificationAmount = ethModification.length;
      const ethModificationTime = ethModification.map(stat => parseInt(stat.operation_time.N)).reduce((a, b) => a + b, 0) / ethModificationAmount;
      const metamaskAmount = metamask.length;
      const metamaskTime = metamask.map(stat => parseInt(stat.operation_time.N)).reduce((a, b) => a + b, 0) / metamaskAmount;


      this.setState({ qldbPutsAmount, qldbPutsTime, ethPutsAmount, ethPutsTime, qldbGetsAmount,
                      qldbGetsTime, ethGetsAmount, ethGetsTime, qldbGetsSpecificTime, qldbGetsSpecificAmount,
                      qldbRevisionAmount, qldbRevisionTime, qldbModificationAmount, qldbModificationTime,
                      ethGetsSpecificTime, ethGetsSpecificAmount, ethModificationAmount, ethModificationTime, metamaskAmount, metamaskTime});
  }

  render() {
    return (
       <Layout>
        <Table basic='very' celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Storage</Table.HeaderCell>
              <Table.HeaderCell>Operation Type</Table.HeaderCell>
              <Table.HeaderCell>Operations</Table.HeaderCell>
              <Table.HeaderCell>Operation average time [ms]</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Icon  name='diamond'/>
              </Table.Cell>
              <Table.Cell>PUT</Table.Cell>
              <Table.Cell>{ this.state.ethPutsAmount }</Table.Cell>
              <Table.Cell>{ this.state.ethPutsTime }</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon  name='book'/>
              </Table.Cell>
              <Table.Cell>PUT</Table.Cell>
              <Table.Cell>{ this.state.qldbPutsAmount }</Table.Cell>
              <Table.Cell>{ this.state.qldbPutsTime }</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon  name='diamond'/>
              </Table.Cell>
              <Table.Cell>GET [list]</Table.Cell>
              <Table.Cell>{ this.state.ethGetsAmount }</Table.Cell>
              <Table.Cell>{ this.state.ethGetsTime }</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon  name='book'/>
              </Table.Cell>
              <Table.Cell>GET [list]</Table.Cell>
              <Table.Cell>{ this.state.qldbGetsAmount }</Table.Cell>
              <Table.Cell>{ this.state.qldbGetsTime }</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon  name='diamond'/>
              </Table.Cell>
              <Table.Cell>GET [specific record]</Table.Cell>
              <Table.Cell>{ this.state.ethGetsSpecificAmount }</Table.Cell>
              <Table.Cell>{ this.state.ethGetsSpecificTime }</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon  name='book'/>
              </Table.Cell>
              <Table.Cell>GET [specific record]</Table.Cell>
              <Table.Cell>{ this.state.qldbGetsSpecificAmount }</Table.Cell>
              <Table.Cell>{ this.state.qldbGetsSpecificTime }</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon  name='book'/>
              </Table.Cell>
              <Table.Cell>Revision</Table.Cell>
              <Table.Cell>{ this.state.qldbRevisionAmount }</Table.Cell>
              <Table.Cell>{ this.state.qldbRevisionTime }</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon  name='book'/>
              </Table.Cell>
              <Table.Cell>Modification</Table.Cell>
              <Table.Cell>{ this.state.qldbModificationAmount }</Table.Cell>
              <Table.Cell>{ this.state.qldbModificationTime }</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon  name='diamond'/>
              </Table.Cell>
              <Table.Cell>Modification</Table.Cell>
              <Table.Cell>{ this.state.ethModificationAmount }</Table.Cell>
              <Table.Cell>{ this.state.ethModificationTime }</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon  name='diamond'/>
              </Table.Cell>
              <Table.Cell>Metamask operation</Table.Cell>
              <Table.Cell>{ this.state.metamaskAmount }</Table.Cell>
              <Table.Cell>{ this.state.metamaskTime }</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
       </Layout>
      );
  }
}

export default TableIndex;
