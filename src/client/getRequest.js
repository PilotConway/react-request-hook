import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

const getRequest = path =>
  ajax(path).pipe(
    map(response => {
      response.ok = true;
      return response;
    }),
    catchError(error => {
      error.ok = false;
      return of(error);
    }),
  );

export default getRequest;
