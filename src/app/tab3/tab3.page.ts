import { Component } from '@angular/core';
import { MovieDetail, Genres } from '../interfaces/interfaces';
import { LocalDataService } from '../services/local-data.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  movies: MovieDetail[] = [];
  genres: Genres[] = [];
  favoriteGenre: any[] = [];

  constructor(private localData: LocalDataService, private movieService: MoviesService, ) {

  }

  //method to reload when tab is accessed
  async ionViewWillEnter(){
    this.loadData();
  }

  async loadData(){
    this.movies = await this.localData.loadFavorites();
    this.genres = await this.movieService.loadGenrers();
    //console.log('Genres', this.genres);

    this.moviesByGenre( this.genres, this.movies );
  }

  moviesByGenre( genres: Genres[], movies: MovieDetail[] ){

    this.favoriteGenre = [];

    genres.forEach( g => {

      this.favoriteGenre.push({
        genre: g.name,
        movie: movies.filter( m => m.genres.find( genre => genre.id === g.id ))
      });
    });
//console.log(this.favoriteGenre);


  }

}
