import createClient from './createClient';
// Require get request import for mocks to work
// eslint-disable-next-line no-unused-vars
import getRequest from './getRequest';

// SEE __mocks__/getRequest for which endpoint paths result in what types of
// responses from the getRequest().toPromise() method.
jest.mock('./getRequest');

describe('createClient', () => {
  it('intializes', () => {
    const client = createClient('https://example.com/foo');
    expect(client.getBaseUrl()).toBe('https://example.com/foo');
  });

  it('intializes with browser url when no baseUrl is passed', () => {
    const client = createClient();
    expect(client.getBaseUrl()).toBe('http://localhost');
  });

  it('intializes with browser url and prefix', () => {
    const client = createClient('/api/v2');
    expect(client.getBaseUrl()).toBe('http://localhost/api/v2');
  });

  it('intializes with browser url and prefix with no leading /', () => {
    const client = createClient('api/v2');
    expect(client.getBaseUrl()).toBe('http://localhost/api/v2');
  });

  describe('get()', () => {
    it('createdClient getRequest creates full url from relative endpoint', async () => {
      const client = createClient('https://example.com/api/v2');
      const response = await client.get('foo');

      expect(response.data).toEqual({ url: 'https://example.com/api/v2/foo' });
    });

    it('does not double leading /', async () => {
      const client = createClient('https://example.com/api/v2');
      const response = await client.get('/foo');

      expect(response.data).toEqual({ url: 'https://example.com/api/v2/foo' });
    });

    it('does not modify full urls', async () => {
      const client = createClient('https://example.com/api/v2');
      const response = await client.get('https://github.com/users');

      expect(response.data).toEqual({ url: 'https://github.com/users' });
    });

    it('rejects when when an error occurs', async () => {
      const client = createClient('https://example.com/api/v2');
      expect(client.get('/404')).rejects.toThrow();
    });
  });
});
