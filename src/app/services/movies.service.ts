/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseMDB, MovieDetail, ResponseCredits, Genres } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL    = environment.url;
const APIKEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularPage = 0;
  genres: Genres[] = [];

  constructor( private http: HttpClient) { }

  //this method will execute a query template that will receive a string
  //this method will recude the url size from this.http.get and will include the constants.
  private executeQuery<T>( query: string) {
    // query will be concatenated to the URL
    query = URL + query;
    query += `&api_key=${ APIKEY }`;

    //we must return the type
    //console.log( query );
    return this.http.get<T>( query );

  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  getPopulars(){

    this.popularPage++;

    const QUERY = `/discover/movie?sort_by=popularity.desc&page=${ this.popularPage }`;

    return this.executeQuery<ResponseMDB>(QUERY);


  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  getFeature(){
    //insert current dates to always fetch latest movies. the 1,0 is to get day 0 of that month.
    const TODAY = new Date();
    const LASTDAY = new Date( TODAY.getFullYear(), TODAY.getMonth() + 1, 0 ).getDate();
    //generate date to inster in apiformat
    const MONTH = TODAY.getMonth() + 1;

    const MONTHSTART = this.formatMonth( MONTH - 1);
    const MONTHEND = this.formatMonth(MONTH);;


    //construct format 2021-01-01
    const STARTDATE = `${ TODAY.getFullYear() }-${ MONTHSTART }-01`;
    const ENDDATE   = `${ TODAY.getFullYear() }-${ MONTHEND }-${ LASTDAY }`;
    //console.log(STARTDATE, ENDDATE);
  // eslint-disable-next-line max-len
  return this.executeQuery<ResponseMDB>(`/discover/movie?primary_release_date.gte=${ STARTDATE }&primary_release_date.lte=${ ENDDATE }`);

  }

  //this function will get the  movie details from api /movie/{movie_id}
  // eslint-disable-next-line @typescript-eslint/member-ordering
  getMovieDetails( id: string ){

    return this.executeQuery<MovieDetail>(`/movie/${ id }?a=1`);
  }

  //get movie credits/actors from /credit/{credit_id}
  // eslint-disable-next-line @typescript-eslint/member-ordering
  getMoviecActors( id: string ){

    return this.executeQuery<ResponseCredits>(`/movie/${ id }/credits?a=1`);
  }

  //function to search movies in APi /search/movie
  // eslint-disable-next-line @typescript-eslint/member-ordering
  searchMovies( text: string ){

    return this.executeQuery(`/search/movie?query=${ text }`);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  formatMonth(month: number): string{
    let monthString;
    //add 0 to date for months 01-09
    if ( month < 10 ) {
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    return monthString;
  }

  //load all genres
  // eslint-disable-next-line @typescript-eslint/member-ordering
  loadGenrers(): Promise<Genres[]> {

    return new Promise( resolve => {

    this.executeQuery(`/genre/movie/list?a=1`)
    .subscribe( res => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.genres = res['genres'];
      resolve(this.genres);
    });

  });
  }
}


