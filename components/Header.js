import React from 'react';
import { Menu, Checkbox, Button } from 'semantic-ui-react';
import { Link } from '../routes';
import { Router } from '../routes';
import {useRouter} from 'next/router';
import {connect} from 'react-redux';

const header =  (props) => {
  const router = useRouter();

  let transactionType = router.pathname.includes('qldbTransactions') ? 'QLDB' : 'ETH';

  return (
    <div style={{ marginBottom: '10px' }}>
      <Menu style={{ marginTop: '10px' }}>
        <Link route="/">
          <a className="item">TelAviv</a>
        </Link>

        <Menu.Menu position="right">
          <Link route="/">
            <a className="item">Go Back</a>
          </Link>
          <Link route="/campaigns/new">
            <a className="item">+</a>
          </Link>
        </Menu.Menu>

      </Menu>

      <div style={{ marginBottom: '20px' }}>
          <Button
            color='black'
            content='Ethereum transactions'
            icon='diamond'
            label={{ basic: true, color: 'black', pointing: 'left', content: props.ethTransactions }}
          />
          <Button
            basic
            color='blue'
            content='QLDB transactions'
            icon='book'
            label={{
              as: 'a',
              basic: true,
              color: 'blue',
              pointing: 'left',
              content: props.qldbTransactions
            }}
          />
        </div>

      <Button primary disabled={transactionType === 'QLDB'} onClick={()=> Router.pushRoute(`/qldbTransactions`)}>QLDB</Button>
      <Button secondary disabled={transactionType === 'ETH'} onClick={()=>  Router.pushRoute(`/`)}>ETH</Button>
    </div>
  );
};

const mapStateToProps = state => ({
    ethTransactions: state.stats.ethTransactions,
    qldbTransactions: state.stats.qldbTransactions
});

export default connect(mapStateToProps)(header);
