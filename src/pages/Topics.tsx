import React, { useState } from 'react';
import { Header, Button } from '../lib';

function Topics() {
  const [loading] = useState<boolean>(false);

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
