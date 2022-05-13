import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { DetailsComponent } from '../components/details/details.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  searchText = '';
  searching = false;
  movies: Movie[] = [];
  suggestions: string[] = ['Pokemon' , '28 days', 'Lord of the Rings', 'Beauty and the Beast'];

  constructor( private moviesService: MoviesService, private modalCtrl: ModalController) {}

  search( event ){
    const VALUE = event.detail.value;

    //this is to stop executing code and load when nothing is sent to the search and avoid getting a null error
    if(VALUE.length === 0){
      this.searching = false;
      this.movies = [];
      return;
    }

    this.searching = true;
    //console.log( event );
    this.moviesService.searchMovies( VALUE )
    .subscribe( resp => {
      console.log(resp);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.movies =  resp['results'];
      this.searching = false;
    });
  }

  async showDetails( id: number ){

    const MODAL = await this.modalCtrl.create({
      component: DetailsComponent,
      componentProps: {
        id
      }
    });

    MODAL.present();

  }
}
