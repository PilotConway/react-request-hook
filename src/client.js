import { ajax } from 'rxjs/ajax';
import { catchError, delay, map } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

const linkParseRegex = /<(.+?)>; rel="(.*)"/;

export const getRequest = path =>
  ajax(path).pipe(
    delay(3000), // For testing the loader
    map(response => {
      if (response === null) {
        return throwError('API Timed out', response);
      }
      console.log('api response: ', response);
      return response;
    }),
    catchError(error => {
      console.log(error);
      console.error('api error: ', error.response);
      return of(error);
    }),
  );

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
    console.info(linkHeader);

    /*
     * example header:
     * <https://api.github.com/users?per_page=5&since=5>; rel="next", <https://api.github.com/users{?since}>; rel="first"
     */
    const rawLinks = linkHeader.split(',');
    links = rawLinks.reduce((acc, link) => {
      const matches = link.match(linkParseRegex);

      console.info('Matched', matches);
      acc[matches[2]] = matches[1];
      console.info(acc);
      // Sets something like next: url, or first: url
      return acc;
    }, links);
  }
  return links;
}

const client = {
  get: async path => {
    const response = await getRequest(path).toPromise();
    const links = processLinks(response);

    return {
      data: response.response,
      rawResponse: response,
      links,
    };
  },
};

export default client;
