import axios from 'axios';

const linkParseRegex = /<(.+?)>; rel="(.*)"/;

/**
 * Processes the Link header and splits the data into the two links
 * and returns the links in an array.
 * @param {*} response The response from the server which contains the xhr request.
 * @return {array} [nextLink, previousLink] urls.
 */
function processLinks(response) {
  // const linkHeader = response.xhr.getResponseHeader('Link');
  const linkHeader = response.headers.link;
  // Set the links to null by default. If they exist on the link header then they will
  // be added.
  let links = { first: null, last: null, prev: null, next: null };

  if (linkHeader) {
    /*
     * example header:
     * <https://api.github.com/users?per_page=5&since=5>; rel="next", <https://api.github.com/users?since=0>; rel="first"
     */
    const rawLinks = linkHeader.split(',');
    links = rawLinks.reduce((acc, link) => {
      const matches = link.match(linkParseRegex);

      // Sets something like next: url, or first: url
      acc[matches[2]] = matches[1];

      return acc;
    }, links);
  }
  return links;
}

const client = {
  /**
   * Runs a get operation on the provided path and returns the data.
   *
   * @param {string} path The complete URL of the endpoint to get.
   * @param {object} options Options for the request
   * @param {object} options.param Key/value pairs of parameters to pass to the request.
   * @param {object} options.headers Key/value pairs of headers to set on the request
   *
   * @return {object} With the following properties:
   *  * {boolean} ok False if the response contains an error.
   *  * {number} status The http status code of the response.
   *  * {string} statusText A message if provided to describe the status response. Null if none
   *  *               was supplied.
   *  * {object|array} data The data from the server.
   *  * {AjaxResponse} rawResponse The RxJS AJAX Response object from the server.
   *  * {object} links The links object containing any link header URLS. All properties are
   *             guranteed to be present, but will be set to null if the link does not exist
   *             in the header. Otherwise, it will be set to the string URL value.
   *  * {string} links.next The URL to get the next page.
   *  * {string} links.prev The URL to get the previous page.
   *  * {string} links.first The URL to get the first page.
   *  * {string} links.last The URL to get the last page.
   */
  get: async (path, options) => {
    // TODO: Try catch here. If error.response then server responded bad.
    // If error.request Then server didn't response
    // Else, something bad happened creating the request
    // let response = {
    //   ok: false,
    //   data: null,
    //   status: 0,
    //   statusText: null,
    //   rawResponse: null,
    //   links: undefined,
    // };

    try {
      const response = await axios.get(path, options);
      const links = processLinks(response);
      return {
        ok: true,
        ...response,
        links,
      };
    } catch (error) {
      if (error.response) {
        return {
          ok: false,
          ...error.response,
          statusText:
            error.response.statusText ||
            error.response.message ||
            (error.response.data || {}).message ||
            null,
        };
      }
      // TODO handle no server errors and request build errors
    }
  },
};

export default client;
