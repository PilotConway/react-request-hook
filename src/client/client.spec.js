import client from './client';
import nock from 'nock';

// make sure no requests are actually sent
nock.disableNetConnect();

describe('raw client', () => {
  it('calls getRequest and returns data', async () => {
    nock('http://localhost')
      .get('/foo')
      .reply(200, { bar: 'baz' });
    const response = await client.get('http://localhost/foo');

    expect(response.data).toEqual({ bar: 'baz' });
    expect(response.links).toEqual({
      next: null,
      prev: null,
      first: null,
      last: null,
    });
  });

  it('responds with an error response when when an error from the server occurs', async () => {
    nock('http://localhost')
      .get('/404')
      .reply(404, { message: 'Not Found' });
    const response = await client.get('http://localhost/404');
    expect(response.ok).toBe(false);
    expect(response.data).toEqual({ message: 'Not Found' });
    expect(response.status).toEqual(404);
    expect(response.statusText).toEqual('Not Found');
  });

  it('Has statusText set to ajax error messsage when no message is in the response', async () => {
    // TODO this isn't the same with axios, so get a better statusText
    nock('http://localhost')
      .get('/500')
      .reply(500);
    const response = await client.get('http://localhost/500');
    expect(response.ok).toBe(false);
    expect(response.data).toEqual('');
    expect(response.status).toEqual(500);
    expect(response.statusText).toEqual(null);
  });

  describe('links', () => {
    it('returns next link', async () => {
      nock('http://localhost')
        .get('/link/next')
        .reply(200, {}, { Link: '<https://example.com/foo?page=7>; rel="next"' });

      const response = await client.get('/link/next');

      expect(response.links.next).toEqual('https://example.com/foo?page=7');
    });

    it('returns previous link', async () => {
      nock('http://localhost')
        .get('/link/prev')
        .reply(200, {}, { Link: '<https://example.com/foo?page=5>; rel="prev"' });

      const response = await client.get('/link/prev');

      expect(response.links.prev).toEqual('https://example.com/foo?page=5');
    });

    it('returns first link', async () => {
      nock('http://localhost')
        .get('/link/first')
        .reply(200, {}, { Link: '<https://example.com/foo?page=1>; rel="first"' });

      const response = await client.get('/link/first');

      expect(response.links.first).toEqual('https://example.com/foo?page=1');
    });

    it('returns last link', async () => {
      nock('http://localhost')
        .get('/link/last')
        .reply(200, {}, { Link: '<https://example.com/foo?page=10>; rel="last"' });

      const response = await client.get('/link/last');

      expect(response.links.last).toEqual('https://example.com/foo?page=10');
    });
  });
});
