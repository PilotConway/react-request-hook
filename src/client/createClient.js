import client from './client';

/**
 * This is a wrapper around client that allows for a base URL to be set once and then use realtive
 * endpoints from then on.
 */
class WrappedClient {
  /**
   *
   * @param {string} baseUrl (optional) Sets the baseUrl for all requests so you can call client
   * methods using only the relative path to this base url. If no baseUrl is set, it will be set
   * to `window.location.origin` If this base URL is not a full url, then it will be used as a
   * prefix appended to `window.location.origin.
   * Eg: new WrappedClient('/api') => https://localhost/api
   */
  constructor(baseUrl) {
    this.baseUrl = this.buildBaseUrl(baseUrl);
  }

  /**
   * Builds the base url. If a full domain name is passed, then returns that domain. If no value is
   * passed, will grab the value from `window.location.origin`. If relative path is passed, builds
   * the url from `window.location.origin` the provided relative path.
   * @param {string} baseUrl
   * @returns {string} Full base URL
   */
  buildBaseUrl(baseUrl) {
    if (typeof baseUrl === 'undefined') {
      return window.location.origin;
    }

    if (!baseUrl.startsWith('http')) {
      return `${window.location.origin}${baseUrl.startsWith('/') ? '' : '/'}${baseUrl}`;
    }
    return baseUrl;
  }

  /**
   * @returns {string} The current base URL for all client requests.
   */
  getBaseUrl = () => {
    return this.baseUrl;
  };

  /**
   * Builds a url by taking the provided endpoint and prepending with the base Url if needed.
   * If the passed endpoint is a full URL, then it will be return unmodified.
   *
   * @param {string} endpoint The endpoint to build a URL from.
   * @returns {string} Full URL for the request.
   */
  buildUrl = endpoint => {
    if (endpoint.startsWith('http')) {
      return endpoint;
    }

    return `${this.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  };

  /**
   * Wrapps client.get by inspecting the endpoint, if it begins with http then it will  just pass
   * the entire url directly to client with no modification, otherwise it will prepend the base
   * url to the endpoint then call client.get().
   *
   * @see src/client/client.js:get for usage of this function.
   */
  get = (endpoint, options) => {
    const url = this.buildUrl(endpoint);
    return client.get(url, options);
  };
}

export default function createClient(baseUrl) {
  return new WrappedClient(baseUrl);
}
