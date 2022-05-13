import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../interfaces/interfaces';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-slideshow-pairs',
  templateUrl: './slideshow-pairs.component.html',
  styleUrls: ['./slideshow-pairs.component.scss'],
})
export class SlideshowPairsComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Output() loadMore = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  };

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

    //modal implementation needs to be async
    async showDetails( id: string ){

      const MODAL = await this.modalCtrl.create({
        component: DetailsComponent,
        componentProps: {
          id
        }
      });

      MODAL.present();

    }

  onClick(){
    this.loadMore.emit();
  }

}
