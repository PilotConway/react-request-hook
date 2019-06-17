const response = {
  ok: true,
  status: 200,
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
        return buildResponsePromise({
          ok: false,
          response: { message: 'Not Found' },
          status: 404,
        });
      }
      case 'https://example.com/api/v2/500':
      case '/500': {
        return buildResponsePromise({
          ok: false,
          status: 500,
        });
      }
      case '/client_error': {
        return Promise.reject(() => {});
      }
      /**
       * Header Link responses
       */
      case '/link/next': {
        return buildResponsePromise({
          xhr: {
            getResponseHeader: () => '<https://example.com/foo?page=7>; rel="next"',
          },
        });
      }
      case '/link/prev': {
        return buildResponsePromise({
          xhr: {
            getResponseHeader: () => '<https://example.com/foo?page=5>; rel="prev"',
          },
        });
      }
      case '/link/first': {
        return buildResponsePromise({
          xhr: {
            getResponseHeader: () => '<https://example.com/foo?page=1>; rel="first"',
          },
        });
      }
      case '/link/last': {
        return buildResponsePromise({
          xhr: {
            getResponseHeader: () => '<https://example.com/foo?page=10>; rel="last"',
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
