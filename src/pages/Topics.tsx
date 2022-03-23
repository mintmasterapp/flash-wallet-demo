import React, { useState } from 'react';
import { Header, Button } from '../lib';
import config from '../utils/config';
import { useConnection } from '../utils/connection';
import { createAccount } from '../utils/accountServices';

function Topics() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    client,
    updateClientAccountBalance,
    getAccountBalance,
  } = useConnection();
  const handleCreateAccount = async () => {};

  return (
    <div>
      <Header title="Topics">
        <Button
          loading={loading}
          name="Create Topics"
          onClick={handleCreateAccount}
        />
      </Header>
    </div>
  );
}

export default Topics;
