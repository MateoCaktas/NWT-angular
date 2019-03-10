import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = "Product Detail";
  product: IProduct;
  errorMessage = '';
  Prosjek: number;
  pocetniProsjek: number;
  Sum: number;
  myFavorites: IProduct[];
  @Input() favoriteProducts: IProduct[];

  products: IProduct[] = [];

  ratingClicked: number;
  itemIdRatingClicked: string;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService : ProductService) { } 
  

  calculateSum(): void{
    this.Sum = 0;
    this.product.ratings.forEach(element => {
    this.Sum = this.Sum + element;
    });
    this.Prosjek = this.Sum / this.product.ratings.length;
    console.log(this.Sum);
    console.log(this.Prosjek);
  }
  

  ngOnInit() {
     const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }


      this.productService.getProducts().subscribe(
        products => {
             this.products = products; 
            },
            error => this.errorMessage = <any>error
          );

    console.log(this.Prosjek);
      this.myFavorites = this.products.filter(element => 
      element.isFavorite === true);

    
      console.log("favoriteProducts");
      console.log(this.favoriteProducts);
      console.log("myFavorites:");
      console.log(this.myFavorites);

      console.log(this.pocetniProsjek);

  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      product => this.product = product,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  ratingComponentClick(clickObj:any): void {//clickObj.itemId
    /*const item = this.products.find(((i: any) => i.productId === clickObj.itemId));*/
    const item = this.product;
    if (!!item) {
      item.starRating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.itemIdRatingClicked = item.productName;

      console.log(`After clicking: ${this.ratingClicked} , ${this.itemIdRatingClicked}`);
    }
    this.Sum = 0;
    this.product.ratings.push(this.ratingClicked);
    this.product.ratings.forEach(element => {
    this.Sum = this.Sum + element;
    });
    this.Prosjek = this.Sum / this.product.ratings.length;
    console.log(this.Sum);
    console.log(this.Prosjek);
  }
}
