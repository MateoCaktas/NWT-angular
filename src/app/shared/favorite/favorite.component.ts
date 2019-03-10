import { Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { IProduct } from 'src/app/products/product';


@Component({
  selector: 'pm-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnChanges {
  @Input() isFavorite: boolean;
  @Input() currentProduct: IProduct;

  @Output() favoriteClicked: EventEmitter<IProduct>= new EventEmitter<IProduct>();
  constructor() {
   }
   
  ngOnChanges(){
    
  }

  onClick():void {
    this.currentProduct.isFavorite = !this.currentProduct.isFavorite;
    this.favoriteClicked.emit(this.currentProduct);
  }

}
