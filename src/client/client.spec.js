import client from './client';
// Require get request import for mocks to work
// eslint-disable-next-line no-unused-vars
import getRequest from './getRequest';

// SEE __mocks__/getRequest for which endpoint paths result in what types of
// responses from the getRequest().toPromise() method.
jest.mock('./getRequest');

describe('raw client', () => {
  it('calls getRequest and returns data', async () => {
    const response = await client.get('foo');

    expect(response.data).toEqual({ bar: 'baz' });
    expect(response.links).toEqual({
      next: null,
      prev: null,
      first: null,
      last: null,
    });
  });

  it('responds with an error response when when an error from the server occurs', async () => {
    const response = await client.get('/404');
    expect(response.ok).toBe(false);
    expect(response.data).toEqual({ message: 'Not Found' });
    expect(response.status).toEqual(404);
    expect(response.statusText).toEqual('Not Found');
  });

  it('Has no statusText when no message is in the response', async () => {
    const response = await client.get('/500');
    expect(response.ok).toBe(false);
    expect(response.data).toEqual([]);
    expect(response.status).toEqual(500);
    expect(response.statusText).toEqual(null);
  });

  it('rejects when when an error occurs in the client', async () => {
    expect(client.get('/client_error')).rejects.toThrow();
  });

  describe('links', () => {
    it('returns next link', async () => {
      const response = await client.get('/link/next');

      expect(response.links.next).toEqual('https://example.com/foo?page=7');
    });

    it('returns previous link', async () => {
      const response = await client.get('/link/prev');

      expect(response.links.prev).toEqual('https://example.com/foo?page=5');
    });

    it('returns first link', async () => {
      const response = await client.get('/link/first');

      expect(response.links.first).toEqual('https://example.com/foo?page=1');
    });

    it('returns last link', async () => {
      const response = await client.get('/link/last');

      expect(response.links.last).toEqual('https://example.com/foo?page=10');
    });
  });
});
