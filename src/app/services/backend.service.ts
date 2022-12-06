import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, Observable, of, catchError, map } from 'rxjs';
import { Stand } from '../models/stand';

export  interface Backend{
  apiUrl:string;  

}

@Injectable()
export  class BackendService<T> implements Backend {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
 
  constructor(  private http: HttpClient) {

  } 
  apiUrl = ""  
  baseUrl = "http://localhost:4000/api/v1/"
  /** GET Standes from the server */
  all(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl + this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched Standes')),
        catchError(this.handleError<T[]>('getStandes', []))
      );
  }

  /** GET Stand by id. Return `undefined` when id not found */
  getNone<Data>(id: number): Observable<T> {
    const url = `${this.baseUrl + this.apiUrl}/?id=${id}`;
    return this.http.get<T[]>(url)
      .pipe(
        map(stands => stands[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} Stand id=${id}`);
        }),
        catchError(this.handleError<T>(`getStand id=${id}`))
      );
  }

  /** GET Stand by id. Will 404 if id not found */
  get(id: number): Observable<T> {
    const url = `${this.baseUrl + this.apiUrl}/${id}`;
    return this.http.get<T>(url).pipe(
      tap(_ => this.log(`fetched Stand id=${id}`)),
      catchError(this.handleError<T>(`getStand id=${id}`))
    );
  }

  /* GET Standes whose name contains search term */
  search(term: string): Observable<T[]> {
    if (!term.trim()) {
      // if not search term, return empty Stand array.
      return of([]);
    }
    return this.http.get<T[]>(`${this.baseUrl + this.apiUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found Standes matching "${term}"`) :
         this.log(`no Standes matching "${term}"`)),
      catchError(this.handleError<T[]>('searchStandes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Stand to the server */
  add(Stand: T): Observable<T> {
    return this.http.post<T>(this.baseUrl + this.apiUrl, Stand, this.httpOptions).pipe(
      tap((newStand: T) => this.log(`added`)),
      catchError(this.handleError<T>('addStand'))
    );
  }

  /** DELETE: delete the Stand from the server */
  delete(id: number): Observable<T> {
    const url = `${this.baseUrl + this.apiUrl}/${id}`;

    return this.http.delete<T>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Stand id=${id}`)),
      catchError(this.handleError<T>('deleteStand'))
    ); 
  }

  /** PUT: update the Stand on the server */
  update(Stand: T): Observable<any> {
    return this.http.put(this.baseUrl + this.apiUrl, Stand, this.httpOptions).pipe(
      tap(_ => this.log(`updated Stand`)),
      catchError(this.handleError<any>('updateStand'))
    );
  }
  
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

       

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.

      return of(result);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.warn(`HeroService: ${message}`);
  }
}
