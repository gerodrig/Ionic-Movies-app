import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MovieDetail } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  _storage: Storage | null = null;
  movies: MovieDetail[] = [];

  constructor( private storage: Storage, private toastCtrl: ToastController) {
    this.init();
    this.loadFavorites();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    // eslint-disable-next-line no-underscore-dangle
    this._storage = storage;
  }

  async presentToast( message: string ){
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  saveMovie( movie: MovieDetail ){

    let duplicated = false;
    let message = '';

    for( const m of this.movies ){
      if ( m.id === movie.id ){
        duplicated = true;
        break;
      }
    }

    if ( duplicated ){
      this.movies = this.movies.filter( m => m.id !== movie.id );
      message = 'Removed from favorites';
    } else {
      this.movies.push( movie );
      message = 'Added to favorites';
    }

    this.presentToast( message );
    // eslint-disable-next-line no-underscore-dangle
    this.storage.set( 'movies', this.movies );

    return !duplicated;
  }

  async loadFavorites(){

    // eslint-disable-next-line no-underscore-dangle
    const movies = await this.storage.get('movies');
    this.movies = movies || [];
    //console.log('get movies', this.movies);

    return this.movies;
  }

  async movieExist( id ){
    //console.log(id);
    await this.loadFavorites();
    const exist = this.movies.find( m => m.id === id );

    return (exist) ? true : false ;
  }

}
