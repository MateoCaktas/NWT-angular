import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"]
})

export class ProductListComponent implements OnInit {
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number= 2;
    showImage: boolean = true;
    newMessage: string ='My new message';
    _listFilter: string;
    broj1: number[] = [8,7,4,3];
    broj: number = 0;
    
    calculateSum(){
    this.broj1.forEach(element => {
        this.broj = this.broj+element;
    })

    this.broj = this.broj / this.broj1.length;

    return this.broj;    
}
    constructor(private productService : ProductService){
        
    }

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredProducts= this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
             product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    filteredProducts: IProduct[];

    products: IProduct[] = [];

    

    toggleImage():void{
        this.showImage = !this.showImage;
    }

    ngOnInit(): void{
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
    }

    onRatingClicked(message: number): void {
        this.newMessage = "Product list: " + message;

        //Ovo dole za zbrajanje ratinga
        this.broj1.push(message);

        this.calculateSum();
    }
}