import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {

    if( !img ){
      return './assets/no-banner.jpg';
    }

    const imgUrl = `${ URL }/${ size }${ img }`;
      //console.log( 'URL', imgUrl );

    return imgUrl;
  }

}
