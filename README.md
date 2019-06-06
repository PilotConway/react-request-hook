# rxjs-api-client-prototype

This is a prototype project to feel out ways I can use RxJS to replace the apps current server.js 
fetch API, and provide a single interface for paged and non-paged REST calls. 

This is a work in progress and is not intended for production at this time.

## TODO 

Work still to be done or is in progress
 
 - [] Need to be able to make post/delete/put calls to the backend. 
 - [] How or should this interact with existing redux. Is redux now (with hooks and context) really necessary for 
      most of the app?
 - [] How can I use the fact that this is built with RxJS to leverage code paths for different requests and merge 
      data together from REST calls and websockets when their domain aligns? Eg. A push of an object change happens
      after a get call. Can the hook get the new data and update state?
 - [] Tests. Need a lot of tests for the hooks, streams, and provider Components. 
 - [] More documentation for the API. Need to fill out the file comments in the API code to better document usage and
      options and the different ways I think this API will be used in the app. 
 - [] PropTypes. I need to ensure all Prop Types for non test Component code is documentated and added with defaults 
      as required. 

Created with CodeSandbox
