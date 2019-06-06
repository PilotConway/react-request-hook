import { ajax } from 'rxjs/ajax';
import { catchError, delay, map, of } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const getRequest = path =>
  ajax.getJSON(path).pipe(
    delay(3000),
    map(response => {
      if (response === null) {
        return throwError('API Timed out', response);
      }
      console.log('api response: ', response);
      return response;
    }),
    catchError(error => {
      console.log(error);
      console.error('api error: ', error.response);
      return of(error);
    }),
  );

const client = {
  get: async path => {
    return await getRequest(path).toPromise();
  },
};

export default client;
