import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pairs'
})
export class PairsPipe implements PipeTransform {

    transform(arr: any[]): any[]{

        //use funtion to create arrays of 2 to show in the poppulars
        const PAIRS =  arr.reduce( (result, value, index, array) => {

            if ( index % 2 === 0) {
                result.push(array.slice(index, index + 2));
            }
            return result;
        }, []);

        return PAIRS;
    }

}
