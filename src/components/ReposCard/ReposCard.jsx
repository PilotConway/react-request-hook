/**
 * Test component to display a card of repos.
 */

import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import Pagination from '../Pagination';
import Request from '../../Request';
import ReposList from './ReposList';

export default function ReposCard() {
  return (
    <Card>
      <CardHeader title="Repositories" />
      <Request endpoint="https://api.github.com/orgs/storybookjs/repos?per_page=5">
        {({ loading, error, data, links }) => (
          <React.Fragment>
            <ReposList repos={data} isLoading={loading} error={error} />
            {!loading && <Pagination links={links} />}
          </React.Fragment>
        )}
      </Request>
    </Card>
  );
}
