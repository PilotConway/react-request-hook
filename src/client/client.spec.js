import client from './client';
import nock from 'nock';

// make sure no requests are actually sent
nock.disableNetConnect();

describe('raw client get()', () => {
  it('calls axios get and returns data', async () => {
    nock('http://localhost')
      .get('/foo')
      .reply(200, { bar: 'baz' });
    const response = await client.get('http://localhost/foo');

    expect(response.ok).toBe(true);
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

  it('errors on socket timeout', async () => {
    nock('http://localhost')
      .get('/foo')
      .delayConnection(10)
      .reply(200, { bar: 'baz' });
    const response = await client.get('http://localhost/foo', { timeout: 5 });
    expect(response.ok).toBe(false);
    expect(response.statusText).toEqual('Connection was aborted: timeout of 5ms exceeded');
    expect(response.code).toEqual('ECONNABORTED');
  });

  it('errors on unreachable url', async () => {
    const response = await client.get('http://thisisnotarealurl.com/thisisabadurl');
    expect(response.ok).toBe(false);
    expect(response.code).toEqual('ENETUNREACH');
    expect(response.statusText).toEqual('The server could not be reached or the URL was invalid.');
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

describe('raw client post()', () => {
  /** Test data structure */
  const data = { foo: 'foo', bar: 'bar', baz: 1 };

  it('calls axios post and returns data', async () => {
    nock('http://localhost')
      .post('/foo', data)
      .reply(200, { bar: 'baz' });
    const response = await client.post('http://localhost/foo', data);

    expect(response.ok).toEqual(true);
    expect(response.data).toEqual({ bar: 'baz' });
    // No links in post calls
    expect(response.links).toBeUndefined();
  });

  it('responds with an error response when when an error from the server occurs', async () => {
    nock('http://localhost')
      .post('/404', data)
      .reply(404, { message: 'Not Found' });
    const response = await client.post('http://localhost/404', data);
    expect(response.ok).toBe(false);
    expect(response.data).toEqual({ message: 'Not Found' });
    expect(response.status).toEqual(404);
    expect(response.statusText).toEqual('Not Found');
  });

  it('Has statusText set to ajax error messsage when no message is in the response', async () => {
    nock('http://localhost')
      .post('/500', data)
      .reply(500);
    const response = await client.post('http://localhost/500', data);
    expect(response.ok).toBe(false);
    expect(response.data).toEqual('');
    expect(response.status).toEqual(500);
    expect(response.statusText).toEqual(null);
  });
});
