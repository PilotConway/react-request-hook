/**
 * Request runs a GET request to the server and returns the data using the render prop pattern.
 * You can also run other CRUD operations using the provided client object.
 *
 * This is a simple wrapper around the `useEndpointData` hook that provides the response as a
 * render prop.
 *
 * ## Usage:
 *
 * ```
 * <Request endpoint="/users" params={{ per_page: 5 }} options={{ headers: { 'Accept': 'application/json' }}>
 *   {({loading, error, data}) => {
 *     if (loading) return <p>Loading...</p>
 *     if (error) return <Banner variant="error" message="An Error Occurred Loading Users" />
 *     return ( ...render your component with users )
 *    }}
 * </Request>
 * ```
 *
 * ## Pagination
 *
 * For paginated endpoints, `<Request>` provides a link property on the object passed to the child
 * function. You can call these functions to get the first, last, next or previous pages.
 * Under the hood it's using the Link header urls to run a new request to get to that page.
 *
 * ## TODO
 *
 * Right now we are just passing the entire URL in as the endpoint, but, in production environments, we should
 * instead pull the client object from a provider in the hook and then be able to setup the client with
 * the url endpoints, headers, sessions, etc... for all client requests. This way, we can just pass something
 * like `/users` as the endpoint and it will know where to go.
 *
 * For browsers, this should be simpler because we will already have the domain and port, but, since this code will
 * have to run in electron, we will also have other mechanisms to pass in the domain or change the domain based on
 * which backend server (primary or secondary) we are connected to.
 *
 */
// import React from 'react';
import PropTypes from 'prop-types';

import useEndpointData from '../useEndpointData';

Request.propTypes = {
  /**
   * The endpoint to send the request to.
   *
   * Examples:
   *
   * `/users`, `/orgs/storybookjs/repos`
   */
  endpoint: PropTypes.string.isRequired,

  /**
   * The render function that will be called. Will be passed a single object with the following
   * properties:
   *   - loading (boolean): True if request is loading.
   *   - error (object): Error object if the request errors, otherwise, this will be null.
   *   - data (array | object): The data returned from the server.
   *   - links (object):  Object containing links for pagination functions. Every property will
   *                      either be null if that link doesn't exist, or a function that will go
   *                      to that page and cause `data` to reload.
   *     - getFirst (function): Function that when called will get the first page of results.
   *     - getLast (function): Function that when called will get the last page of results.
   *     - getNext (function): Function that when called will get the next page of results.
   *     - getPrevious (function): Function that when called will get the previous page of results.
   *   - client (object): The raw client object. Can be used to make other client requests like
   *                      a put/post/delete.
   */
  children: PropTypes.func.isRequired,

  /**
   * Optional property for sending get params to the request.
   *
   * Example:
   * `params={{ per_page: 5 }}` will add `?per_page=5` to the url when making the request.
   */
  params: PropTypes.object,

  /**
   * Optional property for sending options to the request such as headers.
   *
   * Options object can contain:
   *   - headers (object): key/value pairs of headers to send with the request.
   */
  options: PropTypes.object,
};

Request.defaultProps = {
  params: {},
  options: {},
};

export default function Request({ endpoint, params, options, children }) {
  const [data, loading, error, links, client] = useEndpointData(endpoint);
  return children({ data, loading, error, links, client });
}
