import nock from 'nock';

import getRequest from './getRequest';

describe('getRequest', () => {
  it('returns response', async () => {
    const data = { foo: 'bar' };
    nock('http://localhost')
      .get('/foo')
      .reply(200, data);

    const response = await getRequest('http://localhost/foo').toPromise();
    expect(response.ok).toBe(true);
    expect(response.response).toEqual(data);
    expect(response.status).toBe(200);
  });

  it('returns error', async () => {
    const data = { message: 'Error' };
    nock('http://localhost')
      .get('/foo')
      .reply(500, data);

    const response = await getRequest('http://localhost/foo').toPromise();
    expect(response.ok).toBe(false);
    expect(response.response).toEqual(data);
    expect(response.status).toBe(500);
  });
});
