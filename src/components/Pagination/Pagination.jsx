import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

Pagination.propTypes = {
  links: PropTypes.shape({
    getFirst: PropTypes.func,
    getLast: PropTypes.func,
    getNext: PropTypes.func,
    getPrevious: PropTypes.func,
  }).isRequired,
};

export default function Pagination({ links }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
    >
      {links.getFirst && (
        <Button onClick={() => links.getFirst()}>First</Button>
      )}
      {links.getPrevious && (
        <Button onClick={() => links.getPrevious()}>Previous</Button>
      )}
      {links.getNext && <Button onClick={() => links.getNext()}>Next</Button>}
      {links.getLast && <Button onClick={() => links.getLast()}>Last</Button>}
    </Box>
  );
}
