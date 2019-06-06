/**
 * Test component to display a card of users.
 */

import React from 'react';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import Request from '../../Request';
import UsersList from './UsersList';

export default function UsersCard() {
  return (
    <Card>
      <CardHeader title="Users" />
      <Request endpoint="https://api.github.com/users?per_page=5">
        {({ loading, error, data, getNext, getPrevious }) => (
          <React.Fragment>
            <UsersList users={data} isLoading={loading} error={error} />
            <Box
              dispaly="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="100%"
            >
              {getPrevious && (
                <Button onClick={() => getPrevious()}>Previous</Button>
              )}
              {getNext && <Button onClick={() => getNext()}>Next</Button>}
            </Box>
          </React.Fragment>
        )}
      </Request>
    </Card>
  );
}
