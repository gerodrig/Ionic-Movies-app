import { Pipe, PipeTransform } from '@angular/core';
import { MovieDetail } from '../interfaces/interfaces';

@Pipe({
  name: 'imageFilter'
})
export class ImageFilterPipe implements PipeTransform {

  transform(movies: MovieDetail[]): MovieDetail[] {
    return movies.filter( m => m.backdrop_path);
  }
}
