import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieDetail, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  @Input() id;

  //instantiate a MovieDetail so we can get it from our details modal.
  movie: MovieDetail = {};
  hideText = 150;
  actors: Cast[] = [];
  star = 'star-outline';

  sliderOptionActors = {
    slidesPerView: 3.3,
    freemode: true,
    spaceBetween: -5
  };

  constructor( private movieService: MoviesService, private modalCtrl: ModalController, private localData: LocalDataService ) { }

  ngOnInit() {

    this.localData.movieExist( this.id )
    .then( exist => this.star = ( exist ) ? 'star' : 'star-outline');
    //console.log('Detail component exist', exist);
    //console.log('ID', this.id);
    this.movieService.getMovieDetails( this.id )
    .subscribe( resp => {
      //console.log(resp);
      this.movie = resp;
    });

    //get movie credits/actors
    this.movieService.getMoviecActors( this.id )
    .subscribe( resp => {
      //console.log(resp);
      this.actors = resp.cast;
    });
  }

  return(){
    this.modalCtrl.dismiss(console.log('modal dismissed'));
  }

  favorite(){
    const exist = this.localData.saveMovie( this.movie );

    this.star = ( exist ) ? 'star' : 'star-outline';
  }

}
