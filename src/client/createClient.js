import axios from 'axios';
import client from './client';

/**
 * This is a wrapper around client that allows for a base URL to be set once and then use realtive
 * endpoints from then on.
 *
 * TODO: axios will just handle this for us if we create an instance then pass that around.
 */
class WrappedClient {
  /**
   *
   * @param {string} baseURL (optional) Sets the baseUrl for all requests so you can call client
   * methods using only the relative path to this base url. If no baseUrl is set, it will be set
   * to `window.location.origin` If this base URL is not a full url, then it will be used as a
   * prefix appended to `window.location.origin.
   * Eg: new WrappedClient('/api') => https://localhost/api
   * @param {object} options Options passed to the axios instance. See
   * https://github.com/axios/axios#request-config for information on available options
   */
  constructor(baseURL, options = {}) {
    this.axiosInstance = axios.create({
      baseURL: this.buildBaseUrl(baseURL),
      ...options,
    });
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
   * Wrapps client.get by inspecting the endpoint, if it begins with http then it will  just pass
   * the entire url directly to client with no modification, otherwise it will prepend the base
   * url to the endpoint then call client.get().
   *
   * @see src/client/client.js:get for usage of this function.
   */
  get = (endpoint, options) => {
    return client.get(endpoint, options, this.axiosInstance);
  };

  /**
   * TODO: initial post, not full implementation
   */
  post = async (endpoint, data, options) => {
    return await this.axiosInstance.post(endpoint, data, options);
  };
}

export default function createClient(baseUrl, options = {}) {
  return new WrappedClient(baseUrl, options);
}
