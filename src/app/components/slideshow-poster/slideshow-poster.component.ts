import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../interfaces/interfaces';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() movies: Movie[] = [];


  @Output() newLoad = new EventEmitter<boolean>();

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

    //modal implementation needs to be async
    async showDetails( id: number ){

      const MODAL = await this.modalCtrl.create({
        component: DetailsComponent,
        componentProps: {
          id
        }
      });
      MODAL.onDidDismiss().then(() => {
        this.newLoad.emit(true);
      });
      MODAL.present();

    }

}
