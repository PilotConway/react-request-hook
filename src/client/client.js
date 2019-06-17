import getRequest from './getRequest';

const linkParseRegex = /<(.+?)>; rel="(.*)"/;

/**
 * Processes the Link header and splits the data into the two links
 * and returns the links in an array.
 * @param {*} response The response from the server which contains the xhr request.
 * @return {array} [nextLink, previousLink] urls.
 */
function processLinks(response) {
  const linkHeader = response.xhr.getResponseHeader('Link');
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
   * @param {boolean} ok False if the response contains an error.
   * @param {number} status The http status code of the response.
   * @param {string} statusText A message if provided to describe the status response. Null if none
   *                 was supplied.
   * @param {object|array} data The data from the server.
   * @param {AjaxResponse} rawResponse The RxJS AJAX Response object from the server.
   * @param {object} links The links object containing any link header URLS. All properties are
   * guranteed to be present, but will be set to null if the link does not exist in the header.
   * Otherwise, it will be set to the string URL value.
   * @param {string} links.next The URL to get the next page.
   * @param {string} links.prev The URL to get the previous page.
   * @param {string} links.first The URL to get the first page.
   * @param {string} links.last The URL to get the last page.
   */
  get: async path => {
    const response = await getRequest(path).toPromise();
    const links = processLinks(response);

    return {
      ok: response.ok,
      data: response.response,
      status: response.status,
      statusText: (response.response || {}).message || response.message || null,
      rawResponse: response,
      links,
    };
  },
};

export default client;
