/**
 * Test component to display a card of users.
 */

import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import Pagination from '../Pagination';
import Request from '../../Request';
import UsersList from './UsersList';

export default function UsersCard() {
  return (
    <Card>
      <CardHeader title="Users" />
      <Request endpoint="/users?per_page=5">
        {({ loading, error, data, links }) => (
          <React.Fragment>
            <UsersList users={data} isLoading={loading} error={error} />
            {!loading && <Pagination links={links} />}
          </React.Fragment>
        )}
      </Request>
    </Card>
  );
}
