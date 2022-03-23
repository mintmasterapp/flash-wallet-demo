import React from 'react';

const Header = ({ title, children }: { title: string; children: any }) => (
  <div className="flex justify-between">
    <div className="flex-none">
      <h1 className="text-4xl underline">{title}</h1>
    </div>
    <div className="flex-none">{children}</div>
  </div>
);

export default Header;
