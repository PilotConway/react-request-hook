/**
 * This component renders page buttons, and on click will call the functions
 * to traverse to the request page.
 *
 * Renders null if there are no links.
 *
 * Will hide any buttons that do not have links.
 */
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
  // Don't render if there are no links.
  if (
    links.getFirst === null &&
    links.getLast === null &&
    links.getNext === null &&
    links.getPrevious === null
  ) {
    return null;
  }

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
