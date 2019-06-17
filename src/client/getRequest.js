import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

const getRequest = path =>
  ajax(path).pipe(
    map(response => {
      if (response === null) {
        return throwError('API Timed out', response);
      }
      return response;
    }),
    catchError(error => {
      return of(error);
    }),
  );

export default getRequest;
