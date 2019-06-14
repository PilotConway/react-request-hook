const response = {
  xhr: {
    getResponseHeader: jest.fn(),
  },
  response: [],
};

function buildResponsePromise(responseObject) {
  const resolveObject = {
    ...response,
    ...responseObject,
  };

  return Promise.resolve(resolveObject);
}

export default path => ({
  toPromise: () => {
    switch (path) {
      /**
       * General responses
       */
      case 'foo': {
        return buildResponsePromise({
          response: { bar: 'baz' },
        });
      }
      /**
       * Errors
       */
      case 'https://example.com/api/v2/404':
      case '/404': {
        return Promise.reject(() => {});
      }
      /**
       * Header Link responses
       */
      case '/link/next': {
        return buildResponsePromise({
          xhr: {
            getResponseHeader: () =>
              '<https://example.com/foo?page=7>; rel="next"',
          },
        });
      }
      case '/link/prev': {
        return buildResponsePromise({
          xhr: {
            getResponseHeader: () =>
              '<https://example.com/foo?page=5>; rel="prev"',
          },
        });
      }
      case '/link/first': {
        return buildResponsePromise({
          xhr: {
            getResponseHeader: () =>
              '<https://example.com/foo?page=1>; rel="first"',
          },
        });
      }
      case '/link/last': {
        return buildResponsePromise({
          xhr: {
            getResponseHeader: () =>
              '<https://example.com/foo?page=10>; rel="last"',
          },
        });
      }
      default: {
        return buildResponsePromise({
          response: { url: path },
        });
      }
    }
  },
});
