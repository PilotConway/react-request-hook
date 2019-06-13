import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

const getRequest = path =>
  ajax(path).pipe(
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

export default getRequest;
