import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../interfaces/interfaces';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() movies: Movie[] = [];

  slideOpts = {
    slidesPerView: 1.1,
    freeMode: true
  };

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {}

  //modal implementation needs to be async
  async showDetails( id: number ){

    const MODAL = await this.modalCtrl.create({
      component: DetailsComponent,
      componentProps: {
        id
      },
    });

    MODAL.present();

  }

}
