import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { PairsPipe } from './pairs.pipe';
import { ImageFilterPipe } from './image-filter.pipe';



@NgModule({
  declarations: [
    ImagePipe,
    PairsPipe,
    ImageFilterPipe
  ],
  exports: [
    ImagePipe,
    PairsPipe,
    ImageFilterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
