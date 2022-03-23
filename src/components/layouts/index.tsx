import React from 'react';
import Header from './Header';
import { Pager } from '../../lib';

const Layout = ({ children }: any) => (
  <>
    <Header />
    <div className="my-10">
      <Pager>{children}</Pager>
    </div>
  </>
);

export default Layout;
