import createClient from './createClient';
import nock from 'nock';

nock.disableNetConnect();

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
    it('createdClient get creates full url from relative endpoint', async () => {
      nock('https://example.com:443')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/api/v2/foo')
        .reply(200);

      const client = createClient('https://example.com/api/v2');
      const response = await client.get('foo');

      expect(response.config.url).toEqual('https://example.com/api/v2/foo');
    });

    it('does not double leading /', async () => {
      nock('https://example.com:443')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/api/v2/foo')
        .reply(200, { url: 'https://example.com/api/v2/foo' });

      const client = createClient('https://example.com/api/v2');
      const response = await client.get('/foo');

      expect(response.config.url).toEqual('https://example.com/api/v2/foo');
    });

    it('does not modify full urls', async () => {
      const gitHubScope = nock('https://github.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/users')
        .reply(200, { url: 'https://github.com/users' });

      const exampleScope = nock('https://example.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/api/v2/users')
        .reply(404, { url: 'https://exmaple.com/api/v2/users' });

      const client = createClient('https://example.com/api/v2');
      const response = await client.get('https://github.com/users');

      expect(gitHubScope.isDone()).toBe(true);
      expect(exampleScope.isDone()).toBe(false);
      expect(response.ok).toBe(true);
      expect(response.status).toEqual(200);
      expect(response.data).toEqual({ url: 'https://github.com/users' });
    });

    it('rejects when when an error occurs', async () => {
      nock('https://example.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/api/v2/404')
        .reply(404, { message: 'Not Found' });

      const client = createClient('https://example.com/api/v2');
      const response = await client.get('/404');

      expect(response.ok).toBe(false);
      expect(response.data).toEqual({ message: 'Not Found' });
      expect(response.status).toEqual(404);
      expect(response.statusText).toEqual('Not Found');
    });
  });
});
