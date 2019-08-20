
<p>
  <a href="https://github.com/PilotConway/react-request-hook/actions"><img alt="GitHub Actions status" src="https://github.com/PilotConway/react-request-hook/workflows/Build/badge.svg"></a>
</p>

[![codecov](https://codecov.io/gh/PilotConway/rxjs-api-client-prototype/branch/master/graph/badge.svg)](https://codecov.io/gh/PilotConway/rxjs-api-client-prototype)

# react-request-hook

A simple RESTful request API using [axios](https://github.com/axios/axios) and React hooks. This was
born out of a prototype project to test using hooks to fetch data, and allow simple support for
dealing with paged endpoints.

This is a work in progress and is not intended for production at this time.

## Getting Started

There are a few ways to create and use the client in your application. The easiest is in a browser
environment, is to just use the hooks directly or the `<Request>` component to communicate with the
server at the hostname/port the browser is connect to.

If you need to customize an endpoint url or use a different hostname, you can use the
`ClientProvider` and `createClient` function to create a client and pass it the base URL to your
api.

```js
...
import { createClient } from 'src/client';
import ClientProvider from 'src/ClientProvider';
...

function Root() {
  const client = createClient('https://localhost:3000/api/v1');
  return (
    <ClientProvider value={client}>
      <App />
    </ClientProvider>
  );
}
```

You can also use a full URL when calling the hooks or using the `Request` component and it will use
the url as provided to make the call.

```js
<Request endpoint="https://api.github.com/users?per_page=5">
  {({ loading, error, data, links }) => (
    ...
  )}
</Request>
```

By default, if you do not provide a client using the `ClientProvider` and use a realtive endpoint in `Request` or `useEndpointData` then a default client using `window.location.origin` as the base url will be used.

### Render Prop Method

The `<Request>` component provides a render prop method of performing a GET Request to retrieve
data from the server. This method also provides the client object as a parameter to the child
function so you can make other API calls as well using this method.

```js
<Request endpoint="/users" params={{ per_page: 5 }}>
  {({ data, loading, error, links, client}) => (
    ...your components
  )}
</Request>
```

The child function is sent a single object that contains properties for the data returned from the
server, a boolean to mark if the request is still loading or not, any errors returned or generated
during the request, links for paginated endpoints, and the client object if you need to perform
additional actions. See [`<Request>` API documentation](#/Request) in the API section below for more
information about the properties supplied.

### Hooks Method

The library provides the `useEndpointData` hook to make a GET request to an endpoint and returns the same data as the `Request` component function above. The `Request` component is actually just a shallow wrapper call to the `useEndpointData` hook.

```js
import React from 'react';
import useEndpointData from 'src/useEndpointData`;

export default function MyComponent() {
  const [ data, loading, error, links, client ] = useEndpointHooks('/users', { params: { per_page: 5 }});
  return (
    ... your component jsx
  )
}
```

See [`useEndpointData`](#useEndpointData) for details on the hook parameters and return data.

## API

### `client`

This is base object that is used to make requests to the server. It is recommended that you do not create this object but instead use `createClient` to create a new client.

Both `Request` and `useEndpointData` will also provide the client object so you can use it to make other requests to the server such as a put/post/delete.

#### Functions

The `client` object contains 4 functions that can be used to communicate with the server.

- get
- put
- post
- delete

##### get()

Performs a get request to the server.

### `createClient`

This function creates a new client. It's preferred over using `client` itself as you can set the base URL and headers using `createClient` where with `client` you will have to pass full URLs to every request.

### `<ClientProvider>`

The ClientProvider allows for a client to be set as the default client for all requests in the component tree below the provider. You can use [`createClient`](#createClient) to create a client with a specific base url then use relative endpoints in all `Request` or `useEndpointData` calls to get information from the server.

In addition to being able to set the base url, you can also set headers and other information for every request to use.

```js
...
import { createClient } from 'src/client';
import ClientProvider from 'src/ClientProvider';
...

function Root() {
  const client = createClient('https://localhost:3000/api/v1');
  return (
    <ClientProvider value={client}>
      <App />
    </ClientProvider>
  );
}
```

### `useEndpointData`

This is a hook to perform a GET request to retrieve data.

#### Parameters

`useEndpointData` takes two parameters, the require endpoint path and an optional options object.

- `path` _string_ The relative path or full URL of the endpoint to make the GET request. If you
  provide a realtive path, then the hook will try to append the path to the current hostname. If
  `<ClientProvider>` was used, then it will use the client and appent to the base url configured in
  that client instance.
- `options` _object_ Object to provide options to the endpoint. It can contain any of the following
  properties.
  - `params` _object_ Key/value pair of parameters to append to the URL. Eg `{ per_page: 5 }` to
    append `?per_page=5` to the url.
  - `headers` _object_ Key/value pairs of headers to attach to the request.

### `<Request>`

```js
import Request from 'src/Request';
```

Request is a render prop function that takes endpoint information as params and a single function as
the child to the component which passes the data and other information about the request.

#### Props

- `endpoint` _string_ The endpoint to retrieve data from. This can be just the endpoint path (eg
  `/users`) or the full url (`https://api.github.com/users`). If you wish to use the endpoint path
  in non browser environments or to an endpoint that does not match the hostname of the current
  page, then you must either provide the `client` property or configure the
  [`<ClientProvider>`](#ClientProvider) so `Request` can build the full URL.

  If the endpoint is changed, then the request will be made again.

- `params` _object_ Key/value pairs to send as parameters to the GET request.
- `client` _object_ _(optional)_ The client object if required to make the request.

#### Render function

The render function is called with a single parameter object that has the following properties:

- `data` _object | array_ The response data from the server. This is parsed as JSON and then passed
  as an array or object depending on the response.
- `loading` _boolean_ True when the request is still pending.
- `error` [_RequestError_](#RequestError) If an error occurs during the request, either locally in
  the app or a response from the server, then this object will be set with the error information.
  This property will be null if no error occurs, or if the request is pending.
- `link` [_Links_](#Pagination) An object containing pagination links as sent from the servers `Link`
  header.
- `client` [_Client_](#Client) The client object used to make this Request. Can be used to make
  other requests to the server.

### Request Error

TODO: define request error and ensure all errors follow this format.

### Pagination

When an endpoint supports Pagination, the response will contain a link object. This is passed
either as a parameter to the render prop, or as an item in the array return value from the hook.

The `Link` object has the following properties. The object is guranteed to have the properties, even
if the endpoint doesn't support Pagination. Any property that is not found in the `Links` header
will be set to null.

TODO document the props and that it's functions not urls.

## TODO

Work still to be done or is in progress

- [ ] Need to be able to make post/delete/put calls to the backend.
- [ ] How or should this interact with existing redux. Is redux now (with hooks and context) really
      necessary for
      most of the app?
- [ ] How can I use the fact that this is built with RxJS to leverage code paths for different
      requests and merge data together from REST calls and websockets when their domain aligns? Eg.
      A push of an object change happens after a get call. Can the hook get the new data and update
      state?
- [ ] Organization. I need to put the api calls into a folder and organize them better for a cleaner
      import mechanism.
- [ ] Tests. Need a lot of tests for the hooks, streams, and provider Components.
- [ ] More documentation for the API. Need to fill out the file comments in the API code to better
      document usage and options and the different ways I think this API will be used in the app.
- [ ] PropTypes. I need to ensure all Prop Types for non test Component code is documentated and
      added with defaults as required.
- [ ] Document axios options and where they can be used.

Created _initially_ with CodeSandbox
