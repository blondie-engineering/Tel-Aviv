import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

export default props => {

  return (
    <Container style={{position: 'relative', minHeight: '100%'}}>
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />
      </Head>

      <Header />
      {props.children}
    </Container>
  );
};
