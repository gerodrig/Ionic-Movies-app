import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  recentMovies: Movie[] = [];
  populars: Movie[] = [];

  constructor( private moviesService: MoviesService ) {

  }


  ngOnInit(){
    this.moviesService.getFeature()
      .subscribe( resp => {

        //console.log('Resp', resp);
        this.recentMovies = resp.results;
      } );

    this.getPopulars();
  }

  loadMore() {
    this.getPopulars();
  }

  getPopulars(){
    this.moviesService.getPopulars()
    .subscribe( resp => {
      // console.log( 'Populars', resp);
      const ARRTEMP = [ ...this.populars, ...resp.results ];
      this.populars = ARRTEMP;

    });
  }

}
